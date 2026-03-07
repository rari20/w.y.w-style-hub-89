import Layout from '@/components/Layout';
import { stores } from '@/data/products';
import { MapPin, Phone, Clock, Package, QrCode, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StoreLocator() {
  return (
    <Layout>
      <div className="wyw-container py-12 pt-24">
        <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">Curated Selection</p>
        <h1 className="font-display text-[2.5rem] md:text-[3.5rem] italic leading-[1.05] mb-4">Find a Store</h1>
        <p className="text-muted-foreground font-body font-light mb-14 max-w-lg">
          Visit us in person for the full W.Y.W experience.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map(store => {
            const cityName = store.name.replace('W.Y.W ', '');
            return (
              <div key={store.id} className="border border-border p-8">
                <p className="font-body text-[0.625rem] tracking-[0.18em] uppercase text-muted-foreground mb-1">W.Y.W</p>
                <h2 className="font-display text-[2rem] italic leading-[1.1] mb-6">{cityName}</h2>
                <div className="space-y-3 text-[0.85rem] font-body font-light">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground mb-3">Services</p>
                  <div className="flex flex-wrap gap-2">
                    {store.services.map(service => (
                      <span key={service} className="text-[0.7rem] font-body border border-border px-3 py-1.5">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-6 w-full">
                  <ExternalLink className="h-3 w-3 mr-2" /> Get Directions
                </Button>
              </div>
            );
          })}
        </div>

        {/* W.Y.W Lockers */}
        <div className="mt-20 bg-primary text-primary-foreground p-10 md:p-14">
          <div className="flex items-start gap-6">
            <Package className="h-8 w-8 shrink-0 mt-1" />
            <div>
              <h2 className="font-display text-[1.8rem] italic mb-3">W.Y.W Lockers</h2>
              <p className="font-body font-light leading-[1.8] max-w-xl opacity-90">
                Our in-store smart lockers let you collect online orders and drop off returns 7 days a week — no queue, no wait.
                Your locker code is sent via email and SMS — just scan and go. Available at all store locations.
              </p>
              <Button variant="outline" size="sm" className="mt-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* QR Code Feature */}
        <div className="mt-8 border border-border p-10 md:p-14 flex flex-col md:flex-row items-start gap-10">
          <div className="w-24 h-24 bg-muted flex items-center justify-center shrink-0">
            <QrCode className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-[1.5rem] italic mb-3">Create Your Account In-Store</h3>
            <p className="text-muted-foreground font-body font-light leading-[1.8]">
              Scan the QR code at any till or entrance kiosk to register your W.Y.W account on the spot — no app download required.
              Link your purchases to your rewards account instantly.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
