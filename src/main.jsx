import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { BarChart3, CheckCircle2, CreditCard, Droplets, Leaf, Lock, LogOut, Mail, MapPin, Menu, Package, Phone, Settings, ShieldCheck, ShoppingCart, Sun, Trash2, Users, X } from 'lucide-react';
import './styles.css';

const OWNER_EMAIL = 'admin@kiinaqua.mx';
const OWNER_PASSWORD = '12345';

const product = {
  name: 'K’iinAqua',
  subtitle: 'Proyecto HidroSol',
  cashPrice: 3800,
  maxPrice: 4500,
  costMin: 2500,
  costMax: 3000,
  monthlyPayment: 500,
  months: 9,
};

const initialOrders = [
  {
    id: 'KA-001',
    name: 'Escuela Rural Comunitaria',
    phone: '981 000 0000',
    email: 'contacto@escuela.mx',
    mode: 'Financiado',
    quantity: 1,
    total: 4500,
    status: 'Pendiente',
    date: '2026-05-27',
    message: 'Interés para demostración institucional.',
  },
];

function currency(value) {
  return Number(value || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

function Button({ children, className = '', variant = 'primary', ...props }) {
  return <button className={`btn ${variant === 'outline' ? 'btn-outline' : 'btn-primary'} ${className}`} {...props}>{children}</button>;
}

function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function BrandMark({ small = false }) {
  return (
    <div className={`brand-mark ${small ? 'brand-small' : ''}`}>
      <Droplets />
      <span className="bubble one" />
      <span className="bubble two" />
    </div>
  );
}

function PrototypeVisual({ label = 'Prototipo K’iinAqua' }) {
  return (
    <div className="prototype-visual">
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <div className="prototype-head">
        <span>Prototipo real</span>
        <ShieldCheck />
      </div>
      <div className="machine">
        <div className="pipe base" />
        <div className="tank t1" />
        <div className="tank t2" />
        <div className="tank t3" />
        <div className="pipe top" />
        <Sun className="sun-icon" />
        <Droplets className="drop-icon" />
      </div>
      <h3>{label}</h3>
      <p>Diseño sustentable para agua segura usando energía solar.</p>
    </div>
  );
}

function Header({ onAdminClick }) {
  const [open, setOpen] = useState(false);
  const links = ['Inicio', 'Producto', 'Precios', 'Beneficios', 'Contacto'];
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#inicio" className="brand">
          <BrandMark />
          <div>
            <strong>K’iin<span>Aqua</span></strong>
            <small>Proyecto HidroSol</small>
          </div>
        </a>
        <nav className="desktop-nav">
          {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}
          <Button onClick={onAdminClick}><Lock size={16} /> Dueño</Button>
        </nav>
        <button className="menu-btn" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="mobile-nav">
          {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}
          <Button onClick={onAdminClick}>Panel del dueño</Button>
        </div>
      )}
    </header>
  );
}

function Hero({ onBuyClick }) {
  return (
    <section id="inicio" className="hero">
      <div className="section-grid">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="badge"><Sun size={16} /> Prototipo sustentable en desarrollo</div>
          <h1>K’iin<span>Aqua</span></h1>
          <h2>Proyecto HidroSol</h2>
          <p className="lead">Sistema sustentable de potabilización y pasteurización solar, diseñado para transformar el acceso al agua segura mediante energía renovable, bajo costo y aplicación social.</p>
          <div className="actions">
            <Button onClick={onBuyClick}><ShoppingCart /> Solicitar cotización</Button>
            <a href="#precios"><Button variant="outline">Ver precios</Button></a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <PrototypeVisual label="Tecnología + sustentabilidad + innovación" />
        </motion.div>
      </div>
    </section>
  );
}

function ProductSection() {
  return (
    <section id="producto" className="section soft">
      <div className="section-grid">
        <div>
          <h2 className="section-title">¿Qué es K’iinAqua?</h2>
          <p className="text-lg">K’iinAqua es un prototipo de potabilización y pasteurización solar que integra captación solar, calentamiento térmico, evaporación, condensación y pasteurización para apoyar el acceso a agua segura.</p>
          <div className="two-cols mt"><PrototypeVisual label="Vista del sistema" /><PrototypeVisual label="Funcionamiento solar" /></div>
          <div className="two-cols mt">
            <div className="stat"><small>Costo estimado de fabricación</small><strong>{currency(product.costMin)} - {currency(product.costMax)}</strong></div>
            <div className="stat"><small>Precio de comercialización</small><strong className="cyan">{currency(product.cashPrice)} - {currency(product.maxPrice)}</strong></div>
          </div>
        </div>
        <Card className="market-card">
          <h3>Mercado objetivo</h3>
          <p>Clientes con necesidad de agua segura, ahorro energético y soluciones de bajo mantenimiento.</p>
          <ul>{['Familias rurales y urbanas', 'Escuelas rurales', 'Centros comunitarios', 'Ayuntamientos y programas sociales', 'Organizaciones enfocadas en salud pública'].map((item) => <li key={item}><CheckCircle2 /> {item}</li>)}</ul>
        </Card>
      </div>
    </section>
  );
}

function Pricing({ onBuyClick }) {
  const averagePrice = (product.cashPrice + product.maxPrice) / 2;
  const averageCost = (product.costMin + product.costMax) / 2;
  const marginAvg = ((averagePrice - averageCost) / averagePrice) * 100;
  return (
    <section id="precios" className="section">
      <div className="container center">
        <h2 className="section-title">Precios y accesibilidad</h2>
        <p>Precios diseñados para mostrar viabilidad comercial y accesibilidad social.</p>
        <div className="pricing-grid">
          <Card><small className="label">Precio base</small><h3>{currency(product.cashPrice)}</h3><p>Modalidad de pago de contado.</p><Button onClick={onBuyClick}>Solicitar</Button></Card>
          <Card className="featured"><span className="pill">Más accesible</span><small className="label">Pago a mensualidades</small><h3>{currency(product.maxPrice)}</h3><p>Ejemplo: {product.months} mensualidades de {currency(product.monthlyPayment)}.</p><Button onClick={onBuyClick}>Apartar prototipo</Button></Card>
          <Card><small className="label">Margen estimado</small><h3>{marginAvg.toFixed(2)}%</h3><p>Margen promedio con costo de {currency(averageCost)} y precio promedio de {currency(averagePrice)}.</p></Card>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: Droplets, title: 'Uso eficiente del agua', text: 'Busca mejorar la calidad del agua disponible y reducir riesgos sanitarios.' },
    { icon: Sun, title: 'Aprovechamiento solar', text: 'Utiliza el recurso natural más abundante de Campeche: la energía del sol.' },
    { icon: Leaf, title: 'Alternativa ecológica', text: 'Reduce dependencia eléctrica y promueve soluciones sustentables.' },
    { icon: Users, title: 'Enfoque social', text: 'Dirigido a familias, escuelas rurales, centros comunitarios e instituciones.' },
  ];
  return (
    <section id="beneficios" className="section">
      <div className="container center"><h2 className="section-title">Beneficios principales</h2><p>Una propuesta pensada para impacto social, bajo costo y sustentabilidad.</p></div>
      <div className="benefits-grid container">{items.map((item) => <Card key={item.title}><div className="icon-box"><item.icon /></div><h3>{item.title}</h3><p>{item.text}</p></Card>)}</div>
    </section>
  );
}

function ContactForm({ onSubmitOrder }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', mode: 'Contado', quantity: 1, message: '' });
  const total = form.mode === 'Contado' ? product.cashPrice * Number(form.quantity || 1) : product.maxPrice * Number(form.quantity || 1);
  function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return alert('Agrega nombre y teléfono.');
    onSubmitOrder({ ...form, quantity: Number(form.quantity || 1), total });
    setForm({ name: '', phone: '', email: '', mode: 'Contado', quantity: 1, message: '' });
    alert('Solicitud enviada. En el panel del dueño aparecerá como pedido pendiente.');
  }
  const whatsappText = encodeURIComponent(`Hola, quiero información sobre ${product.name}. Me interesa una cotización.`);
  return (
    <section id="contacto" className="contact-section">
      <div className="section-grid">
        <div><h2>Solicita información</h2><p>Este sitio funciona como tienda demostrativa para recibir solicitudes de compra, cotización o contacto institucional.</p><div className="contact-list"><span><Phone /> 981 000 0000</span><span><Mail /> contacto@kiinaqua.mx</span><span><MapPin /> San Francisco de Campeche, Campeche</span></div><a href={`https://wa.me/529810000000?text=${whatsappText}`} target="_blank" rel="noreferrer"><Button>Contactar por WhatsApp</Button></a></div>
        <Card className="form-card"><form onSubmit={submit}><input placeholder="Nombre o institución" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input placeholder="Teléfono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /><input placeholder="Correo electrónico" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><div className="two-cols"><select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}><option>Contado</option><option>Financiado</option></select><input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} /></div><textarea placeholder="Mensaje o necesidad del cliente" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /><div className="total">Total estimado: {currency(total)}</div><Button type="submit">Enviar solicitud</Button></form></Card>
      </div>
    </section>
  );
}

function AdminPanel({ isOpen, onClose, orders, setOrders }) {
  const [logged, setLogged] = useState(false);
  const [login, setLogin] = useState({ email: '', password: '' });
  const totalSales = useMemo(() => orders.reduce((sum, order) => sum + Number(order.total || 0), 0), [orders]);
  const totalUnits = useMemo(() => orders.reduce((sum, order) => sum + Number(order.quantity || 0), 0), [orders]);
  if (!isOpen) return null;
  function tryLogin(e) { e.preventDefault(); login.email === OWNER_EMAIL && login.password === OWNER_PASSWORD ? setLogged(true) : alert('Acceso incorrecto. Demo: admin@kiinaqua.mx / 12345'); }
  function updateStatus(id, status) { setOrders(orders.map((order) => order.id === id ? { ...order, status } : order)); }
  function deleteOrder(id) { setOrders(orders.filter((order) => order.id !== id)); }
  return (
    <div className="modal-bg"><div className="modal"><div className="modal-head"><div><h2>Panel del dueño</h2><p>Control de solicitudes, ventas y estado de pedidos.</p></div><button onClick={onClose}><X /></button></div>{!logged ? <form onSubmit={tryLogin} className="login"><Lock /><h3>Acceso del propietario</h3><p>Demo: admin@kiinaqua.mx / 12345</p><input placeholder="Correo" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} /><input placeholder="Contraseña" type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} /><Button type="submit">Entrar</Button></form> : <div className="dashboard"><div className="right"><Button variant="outline" onClick={() => setLogged(false)}><LogOut /> Salir</Button></div><div className="dashboard-stats"><Card><BarChart3 /><small>Ventas estimadas</small><strong>{currency(totalSales)}</strong></Card><Card><Package /><small>Unidades solicitadas</small><strong>{totalUnits}</strong></Card><Card><CreditCard /><small>Pedidos</small><strong>{orders.length}</strong></Card><Card><Settings /><small>Estado</small><strong>Demo</strong></Card></div><div className="table-wrap"><table><thead><tr><th>Pedido</th><th>Cliente</th><th>Contacto</th><th>Modalidad</th><th>Total</th><th>Estado</th><th></th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><strong>{order.id}</strong><br /><small>{order.date}</small></td><td>{order.name}<br /><small>{order.message}</small></td><td>{order.phone}<br /><small>{order.email || 'Sin correo'}</small></td><td>{order.mode}</td><td><strong>{currency(order.total)}</strong></td><td><select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}><option>Pendiente</option><option>Contactado</option><option>Pagado</option><option>Entregado</option><option>Cancelado</option></select></td><td><button className="trash" onClick={() => deleteOrder(order.id)}><Trash2 /></button></td></tr>)}</tbody></table></div></div>}</div></div>
  );
}

function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [orders, setOrders] = useState(() => {
    try { const saved = localStorage.getItem('kiinaqua_orders'); return saved ? JSON.parse(saved) : initialOrders; } catch { return initialOrders; }
  });
  useEffect(() => { localStorage.setItem('kiinaqua_orders', JSON.stringify(orders)); }, [orders]);
  function addOrder(order) { setOrders([{ ...order, id: `KA-${String(orders.length + 1).padStart(3, '0')}`, status: 'Pendiente', date: new Date().toISOString().slice(0, 10) }, ...orders]); }
  return <main><Header onAdminClick={() => setAdminOpen(true)} /><Hero onBuyClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} /><ProductSection /><Pricing onBuyClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} /><Benefits /><ContactForm onSubmitOrder={addOrder} /><footer><BrandMark small /><strong>K’iinAqua · Proyecto HidroSol</strong><p>Sitio demostrativo para presentación, preventa y validación comercial del prototipo.</p></footer><AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} orders={orders} setOrders={setOrders} /></main>;
}

createRoot(document.getElementById('root')).render(<App />);
