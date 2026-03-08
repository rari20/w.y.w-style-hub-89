import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { stores } from '@/data/products';
import { MapPin, Phone, Clock, Package, QrCode, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const storeMapUrls: Record<string, string> = {
  's1': 'https://www.google.com/maps/search/?api=1&query=14+George+Street+Edinburgh+EH2+2PF',
  's2': 'https://www.google.com/maps/search/?api=1&query=55+Buchanan+Street+Glasgow+G1+3HL',
  's3': 'https://www.google.com/maps/search/?api=1&query=22+Marylebone+High+Street+London+W1U+4PR',
};

export default function StoreLocator() {
  return (
    <Layout>
      <div className="wyw-container pt-24 pb-16">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Stores' }]} />

        <Reveal>
          <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">Curated Selection</p>
          <h1 className="font-display text-[2.5rem] md:text-[3.5rem] italic leading-[1.05] mb-4 text-foreground">Find a Store</h1>
          <p className="text-muted-foreground font-body font-light mb-14 max-w-lg">
            Visit us in person for the full W.Y.W experience.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store, i) => {
            const cityName = store.name.replace('W.Y.W ', '');
            const mapsUrl = storeMapUrls[store.id] || '#';
            return (
              <Reveal key={store.id} delay={i * 80}>
                <div className="border border-border p-8 h-full flex flex-col">
                  <p className="font-body text-[0.625rem] tracking-[0.18em] uppercase text-muted-foreground mb-1">W.Y.W</p>
                  <h2 className="font-display text-[2rem] italic leading-[1.1] mb-6 text-foreground">{cityName}</h2>
                  <div className="space-y-3 text-[0.85rem] font-body font-light">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 group hover:text-primary transition-colors"
                    >
                      <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                      <span className="text-foreground group-hover:text-primary transition-colors">
                        {store.address}
                        <span className="block text-[0.65rem] tracking-[0.08em] uppercase text-accent opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">
                          Open in Maps
                        </span>
                      </span>
                    </a>
                    <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="flex items-start gap-3 hover:text-primary transition-colors">
                      <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                      <span className="text-foreground">{store.phone}</span>
                    </a>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                      <span className="text-foreground">{store.hours}</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground mb-3">Services</p>
                    <div className="flex flex-wrap gap-2">
                      {store.services.map(service => (
                        <span key={service} className="text-[0.7rem] font-body border border-border px-3 py-1.5 text-foreground">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 border border-border px-4 py-2.5 font-body text-[0.7rem] uppercase tracking-[0.14em] text-foreground hover:border-foreground transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" strokeWidth={1.5} /> Get Directions
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* W.Y.W Lockers */}
        <Reveal delay={100}>
          <div className="mt-20 bg-primary text-primary-foreground p-10 md:p-14">
            <div className="flex items-start gap-6">
              <Package className="h-8 w-8 shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h2 className="font-display text-[1.8rem] italic mb-3">W.Y.W Lockers</h2>
                <p className="font-body font-light leading-[1.8] max-w-xl opacity-90">
                  Our in-store smart lockers let you collect online orders and drop off returns 7 days a week — no queue, no wait.
                </p>
                <Button variant="outline" size="sm" className="mt-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* QR Code */}
        <Reveal delay={150}>
          <div className="mt-8 border border-border p-10 md:p-14 flex flex-col md:flex-row items-start gap-10">
            <div className="w-24 h-24 bg-muted flex items-center justify-center shrink-0">
              <QrCode className="h-12 w-12 text-primary" strokeWidth={1} />
            </div>
            <div>
              <h3 className="font-display text-[1.5rem] italic mb-3 text-foreground">Create Your Account In-Store</h3>
              <p className="text-muted-foreground font-body font-light leading-[1.8]">
                Scan the QR code at any till or entrance kiosk to register your W.Y.W account on the spot.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Layout>
  );
}
