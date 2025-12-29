
import React, { useState, useEffect, useMemo, createContext, useContext, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { 
  ShoppingBag, Menu, X, Search, User, ChevronRight, Star, ShieldCheck, 
  Truck, RefreshCw, Plus, Trash2, ArrowLeft, Settings, LayoutDashboard, 
  Box, ShoppingCart, Phone, MessageCircle, FileText, Sparkles, ChevronLeft, 
  Heart, Instagram, Facebook, Twitter, CreditCard, CheckCircle2, Download, 
  Filter, ArrowRight, Eye, LogOut, Image as ImageIcon, PlusCircle, Save, 
  Upload, Video, Calendar, Clock, Smartphone, Globe, TrendingUp, Languages,
  DollarSign, Package, Activity, Camera
} from 'lucide-react';
import { Product, CartItem, Order, Category, SubCategory } from './types';
import { INITIAL_PRODUCTS } from './constants';

// --- Brand Logo Component ---

const SanghviLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`${className} bg-[#1A1A1A] rounded flex items-center justify-center p-1.5 shadow-sm`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" stroke="#D4AF37" strokeWidth="4" />
      <path d="M30 40H70L30 60H70" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 30V40M65 60V70" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round" />
    </svg>
  </div>
);

// --- Comprehensive Translations ---

const TRANSLATIONS = {
  English: {
    home: "Home", gold: "Gold", silver: "Silver", gemstones: "Gemstones",
    buyNow: "Buy Now", videoCall: "Video Call", livePrice: "Live 22K Price",
    saving: "Saving", shoppingBag: "Shopping Bag", quickDelivery: "Quick Delivery",
    seeSimilar: "See Similar", artisanNote: "Artisan's Note", purity: "Purity Hallmarked",
    exchange: "Lifetime Exchange", treasury: "The Treasury", hallmarkNote: "Free 24h Express Shipping on all Gold Sets",
    heroTitle: "Masterpieces of Pure Purity", heroSubtitle: "Start Your Collection", curations: "Current Curations",
    bagEmpty: "Your Bag is Empty", discoverNow: "Discover Now", summary: "Summary",
    subtotal: "Subtotal", total: "Total", secureCheckout: "Secure Checkout", remove: "Remove",
    earnPoints: "Earn Loyalty Points", withPurchase: "With this specific purchase",
    vaultAccess: "Vault Access", unlock: "Unlock", virtualTour: "Virtual Boutique Tour",
    connectInstantly: "Connect Instantly", scheduleLater: "Schedule for Later", maybeLater: "Maybe Later",
    bookSlot: "Book a Slot", yourName: "Your Name", prefDate: "Preferred Date",
    prefTime: "Preferred Time", scheduleWhatsApp: "Schedule via WhatsApp", artisanHeritage: "Handcrafted Excellence Since 1985",
    translate: "Translate"
  },
  Hindi: {
    home: "होम", gold: "सोना", silver: "चांदी", gemstones: "रत्न",
    buyNow: "अभी खरीदें", videoCall: "वीडियो कॉल", livePrice: "लाइव 22K मूल्य",
    saving: "बचत", shoppingBag: "शॉपिंग बैग", quickDelivery: "तेज़ डिलीवरी",
    seeSimilar: "समान देखें", artisanNote: "कारीगर की टिप्पणी", purity: "शुद्धता हॉलमार्क",
    exchange: "लाइफटाइम एक्सचेंज", treasury: "खजाना", hallmarkNote: "सभी गोल्ड सेट पर मुफ्त 24 घंटे एक्सप्रेस शिपिंग",
    heroTitle: "शुद्धता की उत्कृष्ट कृतियाँ", heroSubtitle: "अपना संग्रह शुरू करें", curations: "वर्तमान संग्रह",
    bagEmpty: "आपका बैग खाली है", discoverNow: "अभी खोजें", summary: "सारांश",
    subtotal: "उप-कुल", total: "कुल", secureCheckout: "सुरक्षित चेकआउट", remove: "हटाएं",
    earnPoints: "लॉयल्टी पॉइंट कमाएं", withPurchase: "इस विशिष्ट खरीद के साथ",
    vaultAccess: "तिजोरी पहुंच", unlock: "खोलें", virtualTour: "वर्चुअल बुटीक टूर",
    connectInstantly: "तुरंत जुड़ें", scheduleLater: "बाद के लिए शेड्यूल करें", maybeLater: "शायद बाद में",
    bookSlot: "स्लॉट बुक करें", yourName: "आपका नाम", prefDate: "पसंद की तारीख",
    prefTime: "पसंद का समय", scheduleWhatsApp: "व्हाट्सएप के माध्यम से शेड्यूल करें", artisanHeritage: "1985 से हस्तनिर्मित उत्कृष्टता",
    translate: "अनुवाद"
  },
  Marathi: {
    home: "होम", gold: "सोने", silver: "चांदी", gemstones: "रत्न",
    buyNow: "आत्ता खरेदी करा", videoCall: "व्हिडिओ कॉल", livePrice: "लाइव्ह 22K किंमत",
    saving: "बचत", shoppingBag: "शॉपिंग बॅग", quickDelivery: "जलद वितरण",
    seeSimilar: "सारखे पहा", artisanNote: "कारागिराची नोंद", purity: "शुद्धता हॉलमार्क",
    exchange: "लाइफटाइम एक्सचेंज", treasury: "तिजोरी", hallmarkNote: "सर्व गोल्ड सेटवर मोफत 24 तास एक्सप्रेस शिपिंग",
    heroTitle: "शुद्धतेचे उत्कृष्ट नमुने", heroSubtitle: "तुमचे संकलन सुरू करा", curations: "सध्याचे संकलन",
    bagEmpty: "तुमची बॅग रिकामी आहे", discoverNow: "आत्ताच शोधा", summary: "सारांश",
    subtotal: "एकूण", total: "एकूण किंमत", secureCheckout: "सुरक्षित चेकआउट", remove: "काढून टाका",
    earnPoints: "लॉयल्टी पॉइंट्स मिळवा", withPurchase: "या विशिष्ट खरेदीसह",
    vaultAccess: "तिजोरी प्रवेश", unlock: "उघडा", virtualTour: "व्हर्च्युअल बुटीक टूर",
    connectInstantly: "त्वरीत कनेक्ट व्हा", scheduleLater: "नंतरसाठी शेड्यूल करा", maybeLater: "कदाचित नंतर",
    bookSlot: "स्लॉट बुक करा", yourName: "तुमचे नाव", prefDate: "पसंतीची तारीख",
    prefTime: "पसंतीची वेळ", scheduleWhatsApp: "व्हॉट्सॲपद्वारे शेड्यूल करा", artisanHeritage: "१९८५ पासून हस्तनिर्मित उत्कृष्टता",
    translate: "भाषांतर"
  },
  Gujarati: {
    home: "હોમ", gold: "સોનું", silver: "ચાંદી", gemstones: "રત્નો",
    buyNow: "હમણાં ખરીદો", videoCall: "વિડિઓ કોલ", livePrice: "લાઇવ 22K ભાવ",
    saving: "બચત", shoppingBag: "શોપિંગ બેગ", quickDelivery: "ઝડપી ડિલિવરી",
    seeSimilar: "સમાન જુઓ", artisanNote: "કારીગરની નોંધ", purity: "શુદ્ધતા હોલમાર્ક",
    exchange: "લાઇફટાઇમ એક્સચેન્જ", treasury: "તિજોરી", hallmarkNote: "બધા ગોલ્ડ સેટ પર મફત 24 કલાક એક્સપ્રેસ શિપિંગ",
    heroTitle: "શુદ્ધતાની શ્રેષ્ઠ કૃતિઓ", heroSubtitle: "તમારું સંગ્રહ શરૂ કરો", curations: "વર્તમાન સંગ્રહ",
    bagEmpty: "તમારી બેગ ખાલી છે", discoverNow: "હમણાં શોધો", summary: "સારાંશ",
    subtotal: "પેટાકુલ", total: "કુલ કિંમત", secureCheckout: "સુરક્ષિત ચેકઆઉટ", remove: "દૂર કરો",
    earnPoints: "લોયલ્ટી પોઈન્ટ્સ કમાઓ", withPurchase: "આ વિશિષ્ટ ખરીદી સાથે",
    vaultAccess: "તિજોરી પ્રવેશ", unlock: "ખોલો", virtualTour: "વર્ચ્યુઅલ બુટિક ટૂર",
    connectInstantly: "તરત જ જોડાઓ", scheduleLater: "પછી માટે સમય નક્કી કરો", maybeLater: "કદાચ પછી",
    bookSlot: "સ્લોટ બુક કરો", yourName: "તમારું નામ", prefDate: "પસંદગીની તારીખ",
    prefTime: "પસંદગીનો સમય", scheduleWhatsApp: "વોટ્સએપ દ્વારા સમય નક્કી કરો", artisanHeritage: "1985 થી હસ્તકલા ઉત્કૃષ્ટતા",
    translate: "ભાષાંતર"
  },
  Urdu: {
    home: "ہوم", gold: "سونا", silver: "چاندی", gemstones: "جواہرات",
    buyNow: "ابھی خریدیں", videoCall: "ویڈیو کال", livePrice: "لائیو 22K قیمت",
    saving: "بچت", shoppingBag: "شاپنگ بیگ", quickDelivery: "فوری ترسیل",
    seeSimilar: "ملتے جلتے دیکھیں", artisanNote: "کاریگر का नोट", purity: "پاکیزگی ہال مارک",
    exchange: "لائف ٹائم ایکسچینج", treasury: "خزانہ", hallmarkNote: "تمام گولڈ سیٹس پر مفت 24 گھنٹے ایکسپریس شپنگ",
    heroTitle: "خالص پاکیزگی کے شاہکار", heroSubtitle: "اپنا مجموعہ شروع کریں", curations: "موجودہ مجموعے",
    bagEmpty: "آپ کا بیگ خالی ہے", discoverNow: "ابھی دریافت کریں", summary: "خلاصہ",
    subtotal: "ذیلی کل", total: "کل رقم", secureCheckout: "محفوظ چیک آؤٹ", remove: "ختم کریں",
    earnPoints: "لائلٹی پوائنٹس حاصل کریں", withPurchase: "اس مخصوص خریداری کے ساتھ",
    vaultAccess: "تجوری تک رسائی", unlock: "کھولیں", virtualTour: "ورچوئل بوتیک ٹور",
    connectInstantly: "فوری جڑیں", scheduleLater: "بعد کے لیے وقت طے کریں", maybeLater: "شاید بعد میں",
    bookSlot: "وقت طے کریں", yourName: "آپ کا نام", prefDate: "پسندیدہ تاریخ",
    prefTime: "پسندیدہ وقت", scheduleWhatsApp: "واٹس ایپ کے ذریعے وقت طے کریں", artisanHeritage: "1985 سے دستکاری کی فضیلت",
    translate: "ترجمہ"
  }
};

type Language = keyof typeof TRANSLATIONS;

// --- Context & State Management ---

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS.English;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('sgj_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sgj_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('sgj_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('sgj_is_admin') === 'true';
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('sgj_lang');
    return (saved as Language) || 'English';
  });

  const t = TRANSLATIONS[language];

  useEffect(() => localStorage.setItem('sgj_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('sgj_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('sgj_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('sgj_is_admin', isAdmin.toString()), [isAdmin]);
  useEffect(() => localStorage.setItem('sgj_lang', language), [language]);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => setCart(prev => prev.filter(item => item.product.id !== productId));
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };
  const clearCart = () => setCart([]);
  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setProducts(prev => prev.map(p => {
      const cartItem = order.items.find(item => item.product.id === p.id);
      return cartItem ? { ...p, stock: Math.max(0, p.stock - cartItem.quantity) } : p;
    }));
  };

  return (
    <AppContext.Provider value={{ 
      products, setProducts, cart, addToCart, removeFromCart, 
      updateQuantity, clearCart, orders, addOrder, isAdmin, 
      setIsAdmin, language, setLanguage, t 
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

const formatCurrency = (amount: number, currency: 'INR' | 'USD' = 'INR') => {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0,
    }).format(amount * 80);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
  }).format(amount);
};

// --- Live Gold Price Widget ---

const LiveGoldPriceNavWidget = () => {
  const { t } = useApp();
  const [price, setPrice] = useState(7245);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => prev + (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 5));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden sm:flex items-center group cursor-pointer mr-2 md:mr-6">
      <div className="flex flex-col items-center">
        <div className="bg-[#b8860b] text-white text-[7px] md:text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-0.5 rounded-full z-10 -mb-1.5 border border-white shadow-sm">
          {t.livePrice}
        </div>
        <div className="bg-[#FAF7F2] border border-[#b8860b]/30 rounded-lg px-3 md:px-5 py-1.5 md:py-2 min-w-[100px] md:min-w-[120px] text-center shadow-sm transition-all group-hover:bg-[#FFFBF0] group-hover:border-[#b8860b]/50">
          <span className="serif text-[#1A1A1A] font-bold text-sm md:text-base tracking-tight">₹{Math.round(price)}/g</span>
        </div>
      </div>
    </div>
  );
};

// --- Language Selector ---

const LanguageDropdown = () => {
  const { language, setLanguage, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col items-center" ref={dropdownRef}>
      <span className="text-[7px] uppercase font-bold tracking-[0.2em] text-[#b8860b] mb-1.5">{t.translate}</span>
      <div className="border border-gray-100 rounded-lg p-0.5 hover:border-[#b8860b] transition-all bg-[#FCFBFA]/50 backdrop-blur-sm">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1.5 p-1.5 text-gray-500 hover:text-[#b8860b] transition-colors"
          aria-label="Select Language"
        >
          <Languages size={16} strokeWidth={1.5} />
          <span className="hidden md:block text-[8px] font-bold uppercase tracking-widest">{language}</span>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-32 bg-white border border-gray-100 shadow-xl rounded-lg py-2 z-[70] animate-in fade-in slide-in-from-top-2">
          {Object.keys(TRANSLATIONS).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang as Language);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors ${language === lang ? 'text-[#b8860b]' : 'text-gray-400'}`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Consultation Modal ---

const VideoConsultationModal = ({ product, onClose }: { product: Product, onClose: () => void }) => {
  const { t } = useApp();
  const [step, setStep] = useState<'options' | 'live' | 'schedule'>('options');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scheduleData, setScheduleData] = useState({ date: '', time: '', name: '' });

  const startLive = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      setStep('live');
      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      }, 100);
    } catch (err) {
      alert("Please allow camera access for the virtual consultation.");
    }
  };

  const stopLive = () => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    onClose();
  };

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Sanghvi Gold, I'm ${scheduleData.name}. I would like to schedule a Video Consultation for the "${product.name}" on ${scheduleData.date} at ${scheduleData.time}. Link: ${window.location.href}`;
    window.open(`https://wa.me/91000000000?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl overflow-hidden shadow-2xl rounded-sm">
        {step === 'options' && (
          <div className="p-12 text-center space-y-8">
            <div className="w-20 h-20 bg-[#b8860b]/10 rounded-full flex items-center justify-center mx-auto text-[#b8860b]">
              <Video size={40} />
            </div>
            <h2 className="serif text-4xl font-bold">{t.virtualTour}</h2>
            <p className="text-gray-500 max-w-sm mx-auto">Experience the sparkle of <span className="font-bold text-gray-900">{product.name}</span> live with our expert jewelry consultants.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button onClick={startLive} className="flex flex-col items-center p-6 border border-gray-100 hover:border-[#b8860b] hover:bg-[#FCFBFA] transition-all group">
                <Smartphone className="mb-4 text-gray-400 group-hover:text-[#b8860b]" />
                <span className="text-[10px] uppercase font-bold tracking-widest">{t.connectInstantly}</span>
              </button>
              <button onClick={() => setStep('schedule')} className="flex flex-col items-center p-6 border border-gray-100 hover:border-[#b8860b] hover:bg-[#FCFBFA] transition-all group">
                <Calendar className="mb-4 text-gray-400 group-hover:text-[#b8860b]" />
                <span className="text-[10px] uppercase font-bold tracking-widest">{t.scheduleLater}</span>
              </button>
            </div>
            <button onClick={onClose} className="text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-200 pb-1">{t.maybeLater}</button>
          </div>
        )}

        {step === 'live' && (
          <div className="relative aspect-video bg-black">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Connecting to Boutique Manager...</span>
              </div>
              <div className="flex justify-center space-x-4">
                <button onClick={stopLive} className="bg-red-600 p-4 rounded-full hover:bg-red-700 transition-colors">
                  <Phone size={24} className="rotate-[135deg]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'schedule' && (
          <div className="p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="serif text-3xl font-bold">{t.bookSlot}</h2>
              <button onClick={() => setStep('options')}><ArrowLeft size={20} /></button>
            </div>
            <form onSubmit={handleSchedule} className="space-y-6">
              <input required placeholder={t.yourName} className="w-full p-4 bg-gray-50 border border-gray-100 outline-none focus:border-[#b8860b]" onChange={e => setScheduleData({...scheduleData, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">{t.prefDate}</label>
                  <input required type="date" className="w-full p-4 bg-gray-50 border border-gray-100 outline-none" onChange={e => setScheduleData({...scheduleData, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">{t.prefTime}</label>
                  <input required type="time" className="w-full p-4 bg-gray-50 border border-gray-100 outline-none" onChange={e => setScheduleData({...scheduleData, time: e.target.value})} />
                </div>
              </div>
              <button className="w-full bg-[#1A1A1A] text-white py-5 text-xs font-bold uppercase tracking-widest flex items-center justify-center">
                <MessageCircle size={18} className="mr-2" /> {t.scheduleWhatsApp}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Navbar ---

const Navbar = () => {
  const { cart, t, isAdmin } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.25em] py-2 text-center font-semibold z-[60] relative">
        {t.hallmarkNote}
      </div>
      <nav className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-gray-100 h-20 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden lg:flex space-x-8">
              <Link to="/" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#b8860b] font-bold transition-all">{t.home}</Link>
              <Link to="/shop?category=Gold" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#b8860b] font-bold transition-all">{t.gold}</Link>
              <Link to="/shop?category=Silver" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#b8860b] font-bold transition-all">{t.silver}</Link>
              <Link to="/shop?category=Gemstone" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#b8860b] font-bold transition-all">{t.gemstones}</Link>
            </div>
          </div>

          <Link to="/" className="flex items-center space-x-3 group">
            <SanghviLogo className="w-10 h-10 md:w-12 md:h-12 transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="serif text-xl md:text-2xl font-bold tracking-tighter text-[#1a1a1a] leading-none">SANGHVI</span>
              <span className="text-[7px] md:text-[8px] tracking-[0.4em] uppercase font-bold text-[#b8860b] -mt-0.5">Gold</span>
            </div>
          </Link>

          <div className="flex items-center">
            <LiveGoldPriceNavWidget />
            <div className="flex items-center space-x-3 md:space-x-5">
              <LanguageDropdown />
              <Link to="/admin" className={`p-2 transition-colors relative group ${isAdmin ? 'text-[#b8860b]' : 'text-gray-400 hover:text-[#b8860b]'}`}>
                {isAdmin ? <LayoutDashboard size={20} strokeWidth={1.5} /> : <User size={20} strokeWidth={1.5} />}
              </Link>
              <Link to="/cart" className="p-2 text-gray-600 hover:text-[#b8860b] relative transition-colors">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#b8860b] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden fixed top-20 left-0 w-full bg-white border-t border-gray-100 h-screen z-50 animate-in slide-in-from-left">
            <div className="p-6 space-y-6">
              <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-bold border-b border-gray-50 pb-4">{t.home}</Link>
              <Link to="/shop?category=Gold" onClick={() => setIsOpen(false)} className="block text-lg font-bold border-b border-gray-50 pb-4">{t.gold}</Link>
              <Link to="/shop?category=Silver" onClick={() => setIsOpen(false)} className="block text-lg font-bold border-b border-gray-50 pb-4">{t.silver}</Link>
              <Link to="/shop?category=Gemstone" onClick={() => setIsOpen(false)} className="block text-lg font-bold border-b border-gray-50 pb-4">{t.gemstones}</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

// --- Product Form Component ---

const ProductFormModal = ({ onClose }: { onClose: () => void }) => {
  const { setProducts } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: Category.GOLD,
    subCategory: SubCategory.RINGS,
    stock: '',
    images: [] as string[]
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const newProduct: Product = {
      id: `p${Date.now()}`,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      subCategory: formData.subCategory,
      stock: parseInt(formData.stock),
      images: formData.images,
      featured: false
    };

    setProducts(prev => [newProduct, ...prev]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10">
          <h2 className="serif text-3xl font-bold">Add New Masterpiece</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors"><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Product Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-gray-50 border border-transparent focus:border-[#b8860b] rounded-xl outline-none transition-all" placeholder="e.g. Royal Heritage Necklace" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Description</label>
              <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-4 bg-gray-50 border border-transparent focus:border-[#b8860b] rounded-xl outline-none transition-all resize-none" placeholder="Describe the artisan work, materials, and inspiration..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Price (INR)</label>
                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-4 bg-gray-50 border border-transparent focus:border-[#b8860b] rounded-xl outline-none transition-all" placeholder="e.g. 150000" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Stock Level</label>
                <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full p-4 bg-gray-50 border border-transparent focus:border-[#b8860b] rounded-xl outline-none transition-all" placeholder="Available units" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as Category})} className="w-full p-4 bg-gray-50 border border-transparent focus:border-[#b8860b] rounded-xl outline-none transition-all appearance-none cursor-pointer">
                  {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Sub-Category</label>
                <select value={formData.subCategory} onChange={e => setFormData({...formData, subCategory: e.target.value as SubCategory})} className="w-full p-4 bg-gray-50 border border-transparent focus:border-[#b8860b] rounded-xl outline-none transition-all appearance-none cursor-pointer">
                  {Object.values(SubCategory).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block">Product Imagery</label>
            <div className="grid grid-cols-3 gap-4">
              {formData.images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100">
                  <img src={img} className="w-full h-full object-cover" alt="" />
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))} className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20} /></button>
                </div>
              ))}
              <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-[#b8860b] hover:bg-gray-50 transition-all flex flex-col items-center justify-center text-gray-400 hover:text-[#b8860b]">
                <Plus size={32} strokeWidth={1.5} />
                <span className="text-[9px] uppercase font-bold tracking-widest mt-2">Upload</span>
              </button>
            </div>
            <input type="file" ref={fileInputRef} hidden multiple accept="image/*" onChange={handleImageUpload} />

            <div className="pt-6 space-y-4">
              <button type="submit" className="w-full bg-[#1A1A1A] text-white py-6 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all active:scale-95 flex items-center justify-center">
                <Save className="mr-3" size={18} /> Store in Inventory
              </button>
              <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest">Note: Product will go live instantly on the boutique front.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Admin Dashboard Component ---

const AdminDashboard = () => {
  const { products, orders, setIsAdmin, isAdmin } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products'>('overview');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const outOfStock = products.filter(p => p.stock === 0).length;

  const handleLogout = () => {
    setIsAdmin(false);
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {showAddForm && <ProductFormModal onClose={() => setShowAddForm(false)} />}
      
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="text-[#b8860b]" />
            <h1 className="serif text-2xl font-bold">Management Portal</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-all font-bold text-[10px] uppercase tracking-widest">
            <LogOut size={16} /> <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex space-x-6 overflow-x-auto pb-2 scrollbar-hide">
            <button onClick={() => setActiveTab('overview')} className={`px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all ${activeTab === 'overview' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-gray-100'}`}>Overview</button>
            <button onClick={() => setActiveTab('orders')} className={`px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all ${activeTab === 'orders' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-gray-100'}`}>Orders ({orders.length})</button>
            <button onClick={() => setActiveTab('products')} className={`px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all ${activeTab === 'products' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-gray-100'}`}>Inventory ({products.length})</button>
          </div>
          
          {activeTab === 'products' && (
            <button onClick={() => setShowAddForm(true)} className="flex items-center justify-center space-x-2 bg-[#b8860b] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(184,134,11,0.2)] hover:bg-[#966d09] transition-all">
              <PlusCircle size={18} /> <span>Add New Piece</span>
            </button>
          )}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-6">
                <div className="bg-green-50 p-4 rounded-xl text-green-600"><DollarSign size={32} /></div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Total Revenue</p>
                  <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-6">
                <div className="bg-blue-50 p-4 rounded-xl text-blue-600"><Package size={32} /></div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Active Orders</p>
                  <p className="text-3xl font-bold">{orders.length}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-6">
                <div className="bg-orange-50 p-4 rounded-xl text-orange-600"><Activity size={32} /></div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Stock Alerts</p>
                  <p className="text-3xl font-bold">{outOfStock} <span className="text-sm font-normal text-gray-400">Critical</span></p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="serif text-2xl font-bold mb-6">Recent Activity</h3>
              {orders.length === 0 ? (
                <div className="py-20 text-center text-gray-400 italic">No transactions recorded yet.</div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-bold text-sm">Order #{order.id.slice(-6)}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{order.customerDetails.name} • {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#b8860b]">{formatCurrency(order.totalAmount)}</p>
                        <span className="text-[9px] uppercase font-bold px-2 py-0.5 bg-blue-100 text-blue-600 rounded">{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-400">Order ID</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-400">Customer</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-400">Status</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.length === 0 ? (
                  <tr><td colSpan={4} className="p-20 text-center text-gray-400 italic">No orders found.</td></tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-5 text-sm font-bold">#{order.id.slice(-8)}</td>
                      <td className="px-8 py-5">
                        <p className="text-sm font-medium">{order.customerDetails.name}</p>
                        <p className="text-[10px] text-gray-400">{order.customerDetails.phone}</p>
                      </td>
                      <td className="px-8 py-5">
                         <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-bold uppercase rounded-full">{order.status}</span>
                      </td>
                      <td className="px-8 py-5 text-right font-bold text-[#1A1A1A]">{formatCurrency(order.totalAmount)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
             <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-400">Product</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-400">Stock</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5 flex items-center space-x-4">
                      <img src={product.images[0]} className="w-12 h-12 object-cover rounded-lg border border-gray-100 shadow-sm" alt="" />
                      <div>
                        <p className="text-sm font-bold">{product.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{product.category}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-orange-400' : 'bg-red-500'}`}></span>
                        <span className="text-sm font-bold">{product.stock} units</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right font-bold">{formatCurrency(product.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Views ---

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart, t } = useApp();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showConsult, setShowConsult] = useState(false);
  
  const product = products.find(p => p.id === id);

  if (!product) return <div className="py-24 text-center">Piece Not Found</div>;

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate('/cart');
  };

  const savings = Math.round(product.price * 0.25 * 80);

  return (
    <div className="animate-in fade-in duration-500 relative pb-32">
      {showConsult && <VideoConsultationModal product={product} onClose={() => setShowConsult(false)} />}
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.3em] mb-2">{product.category} • {product.subCategory}</p>
        <h1 className="serif text-3xl md:text-5xl font-bold mb-4 tracking-tight">{product.name}</h1>
        <div className="flex items-center space-x-4 mb-10">
          <span className="text-3xl font-extrabold text-[#1A1A1A]">{formatCurrency(product.price)}</span>
          <span className="text-xl text-gray-400 line-through font-medium">{formatCurrency(product.price * 1.3)}</span>
          <div className="bg-[#FF9494]/20 text-[#FF5B5B] px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest flex items-center">
            {t.saving} ₹{savings}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 relative">
            <div className="bg-[#F7F7F7] aspect-[4/5] rounded-xl overflow-hidden shadow-sm relative group">
              <img src={product.images[selectedImage]} className="w-full h-full object-cover" alt={product.name} />
              <div className="absolute top-6 left-0">
                <div className="bg-[#FCE3C1] text-[#935B00] px-6 py-2 rounded-r-full text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                   {t.quickDelivery}
                </div>
              </div>
              <div className="absolute bottom-6 left-6">
                 <button className="bg-white/90 backdrop-blur-md border border-gray-100 text-[#9365E4] px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center hover:bg-white transition-all">
                   <Eye size={14} className="mr-2" /> {t.seeSimilar}
                 </button>
              </div>
              <div className="absolute bottom-6 right-6">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
                  <span className="text-green-600 font-bold text-xs flex items-center"><Star size={12} fill="currentColor" className="mr-1"/> 4.9</span>
                  <span className="text-gray-400 text-[10px] border-l border-gray-200 pl-2">128</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-6 overflow-x-auto pb-4 scrollbar-hide">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 transition-all ${selectedImage === i ? 'border-[#b8860b]' : 'border-transparent opacity-50'}`}>
                  <img src={img} className="w-full h-full object-cover rounded-md" alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <div className="bg-[#FEE2E2]/30 border border-[#FEE2E2] p-6 rounded-xl flex items-center space-x-4">
              <div className="bg-[#FF9494] p-3 rounded-full text-white"><TrendingUp size={24}/></div>
              <div>
                <p className="text-sm font-bold text-[#1A1A1A]">{t.earnPoints}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{t.withPurchase}</p>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="serif text-2xl font-bold">{t.artisanNote}</h3>
              <p className="text-gray-600 leading-relaxed italic text-lg">{product.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-6 bg-white border border-gray-100 rounded-xl text-center space-y-2 shadow-sm">
                <ShieldCheck className="mx-auto text-[#b8860b]" size={32} />
                <p className="text-[10px] font-bold uppercase tracking-widest">{t.purity}</p>
              </div>
              <div className="p-6 bg-white border border-gray-100 rounded-xl text-center space-y-2 shadow-sm">
                <RefreshCw className="mx-auto text-[#b8860b]" size={32} />
                <p className="text-[10px] font-bold uppercase tracking-widest">{t.exchange}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-[80] bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] md:static md:shadow-none md:border-none md:bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-10 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-1 hidden md:block">
            <button className="p-4 border border-gray-100 rounded-full hover:bg-gray-50 transition-all text-gray-400 hover:text-red-500">
              <Heart size={24} />
            </button>
          </div>
          <div className="col-span-6 md:col-span-5">
            <button 
              onClick={() => setShowConsult(true)}
              className="w-full flex items-center justify-center space-x-3 border-2 border-[#25D366] text-[#25D366] font-extrabold uppercase tracking-widest py-4 rounded-xl text-[11px] hover:bg-[#25D366] hover:text-white transition-all shadow-md active:scale-95"
            >
              <Video size={18} /> <span>{t.videoCall}</span>
            </button>
          </div>
          <div className="col-span-6 md:col-span-6">
            <button 
              onClick={handleBuyNow}
              className="w-full bg-[#9365E4] text-white font-extrabold uppercase tracking-[0.2em] py-4 rounded-xl text-[11px] shadow-[0_10px_20_rgba(147,101,228,0.3)] hover:bg-[#7c4bd4] transition-all active:scale-95"
            >
              {t.buyNow}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => (
  <Link to={`/product/${product.id}`} className="group block transform transition-all duration-500 hover:-translate-y-2">
    <div className="relative aspect-[4/5] bg-[#F7F7F7] overflow-hidden mb-4 rounded-xl shadow-sm group-hover:shadow-2xl transition-all">
      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute top-4 right-4">
        <button className="bg-white/80 p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors" onClick={(e) => e.preventDefault()}>
          <Heart size={16} />
        </button>
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">{product.category}</p>
      <h3 className="serif text-xl font-bold text-gray-900 group-hover:text-[#b8860b] transition-colors">{product.name}</h3>
      <p className="text-sm font-medium text-[#1A1A1A]">{formatCurrency(product.price)}</p>
    </div>
  </Link>
);

const Home = () => {
  const { products, t } = useApp();
  const featured = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="animate-in fade-in duration-1000">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <img src="https://images.pexels.com/photos/6387623/pexels-photo-6387623.jpeg?auto=compress&cs=tinysrgb&w=2500" className="absolute inset-0 w-full h-full object-cover animate-zoom-slow" alt="Hero" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl space-y-8 animate-fade-up">
           <h1 className="serif text-6xl md:text-8xl font-bold mb-12 leading-tight drop-shadow-2xl">{t.heroTitle}</h1>
           <Link to="/shop" className="bg-[#b8860b] text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#966d09] transition-all shadow-2xl rounded-sm">{t.heroSubtitle}</Link>
        </div>
      </section>

      <section id="curations" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="serif text-5xl font-bold mb-16 text-center">{t.curations}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {featured.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, t } = useApp();
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  if (cart.length === 0) return (
    <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-8">
      <h2 className="serif text-5xl font-bold">{t.bagEmpty}</h2>
      <Link to="/shop" className="inline-block bg-[#b8860b] text-white px-12 py-5 text-[10px] font-bold uppercase tracking-widest">{t.discoverNow}</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="serif text-5xl font-bold mb-16">{t.shoppingBag}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-8">
          {cart.map(item => (
            <div key={item.product.id} className="flex gap-8 pb-8 border-b border-gray-100">
              <div className="w-40 aspect-square rounded-xl overflow-hidden shadow-sm">
                <img src={item.product.images[0]} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-grow space-y-4">
                <h3 className="serif text-2xl font-bold">{item.product.name}</h3>
                <p className="text-xl font-bold text-[#b8860b]">{formatCurrency(item.product.price * item.quantity)}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex border border-gray-100 rounded-lg">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-4 py-2 hover:bg-gray-50">-</button>
                    <span className="px-6 py-2 font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-4 py-2 hover:bg-gray-50">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-gray-300 hover:text-red-500 transition-colors uppercase text-[10px] font-bold tracking-widest">{t.remove}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4 bg-[#FCFBFA] p-10 rounded-2xl border border-gray-100 h-fit">
          <h4 className="serif text-3xl font-bold mb-10 text-center">{t.summary}</h4>
          <div className="space-y-6 text-sm mb-12">
            <div className="flex justify-between">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{t.subtotal}</span>
              <span className="font-bold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-6">
              <span className="serif font-bold text-2xl">{t.total}</span>
              <span className="serif font-bold text-3xl text-[#b8860b]">{formatCurrency(subtotal)}</span>
            </div>
          </div>
          <Link to="/checkout" className="block w-full bg-[#1A1A1A] text-white text-center py-6 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-black transition-all">{t.secureCheckout}</Link>
        </div>
      </div>
    </div>
  );
};

const Shop = () => {
  const { products, t } = useApp();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryFilter = query.get('category');
  
  const filtered = useMemo(() => {
    return categoryFilter ? products.filter(p => p.category === categoryFilter) : products;
  }, [products, categoryFilter]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex justify-between items-end mb-20">
        <div>
          <h1 className="serif text-6xl font-bold mb-4">{categoryFilter || t.treasury}</h1>
          <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-gray-400">{t.artisanHeritage}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
        {filtered.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
};

const AdminLogin = () => {
  const { t, setIsAdmin } = useApp();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      navigate('/admin/dashboard', { replace: true });
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-32 text-center">
      <h1 className="serif text-4xl font-bold mb-10">{t.vaultAccess}</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="password" placeholder="Secure Entry Key" className="w-full p-5 border border-gray-100 bg-[#FCFBFA] outline-none focus:border-[#b8860b] text-center" onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-[#1A1A1A] text-white py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">{t.unlock}</button>
      </form>
    </div>
  );
};

const AdminRedirect = () => {
  const { isAdmin } = useApp();
  return isAdmin ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/admin/login" replace />;
};

const Footer = () => {
  const { t } = useApp();
  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <SanghviLogo className="w-10 h-10 border border-gray-800" />
              <div className="flex flex-col">
                <span className="serif text-xl font-bold tracking-tighter text-white">SANGHVI</span>
                <span className="text-[7px] tracking-[0.4em] uppercase font-bold text-[#b8860b] -mt-0.5">Gold</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{t.artisanHeritage}</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#b8860b] mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><Link to="/shop?category=Gold" className="hover:text-white transition-colors">{t.gold}</Link></li>
              <li><Link to="/shop?category=Silver" className="hover:text-white transition-colors">{t.silver}</Link></li>
              <li><Link to="/shop?category=Gemstone" className="hover:text-white transition-colors">{t.gemstones}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#b8860b] mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition-colors">Return Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#b8860b] mb-6">Stay Connected</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#b8860b] transition-all"><Instagram size={18} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#b8860b] transition-all"><Facebook size={18} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#b8860b] transition-all"><Twitter size={18} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center md:text-left">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">© 2025 Sanghvi Gold Jewels Private Limited. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col selection:bg-[#9365E4] selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<AdminRedirect />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
          <a href="https://wa.me/91000000000" target="_blank" className="fixed bottom-32 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform md:bottom-8"><MessageCircle size={32} /></a>
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
