import Layout from '@/components/Layout';
import { stores } from '@/data/products';
import { MapPin, Phone, Clock, Package, Zap, QrCode, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StoreLocator() {
  return (
    <Layout>
      <div className="wyw-container py-8">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Curated Selection</p>
        <h1 className="text-5xl md:text-6xl font-display mb-4">FIND A STORE</h1>
        <p className="text-muted-foreground mb-12 max-w-lg">
          Visit us in person for the full W.Y.W experience.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map(store => (
            <div key={store.id} className="wyw-card p-6">
              <h2 className="font-display text-2xl mb-4">{store.name.toUpperCase()}</h2>
              <div className="space-y-3 text-sm">
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
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Services</p>
                <div className="flex flex-wrap gap-2">
                  {store.services.map(service => (
                    <span key={service} className="text-xs bg-muted px-2 py-1 rounded-sm flex items-center gap-1">
                      {service === 'W.Y.W Lockers' ? <Package className="h-3 w-3 text-primary" /> : <Zap className="h-3 w-3 text-primary" />}
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                <ExternalLink className="h-3 w-3 mr-2" /> Get Directions
              </Button>
            </div>
          ))}
        </div>

        {/* W.Y.W Lockers */}
        <div className="mt-16 bg-primary text-primary-foreground p-8 rounded-sm">
          <div className="flex items-start gap-4">
            <Package className="h-8 w-8 shrink-0 mt-1" />
            <div>
              <h2 className="font-display text-3xl mb-2">W.Y.W LOCKERS</h2>
              <p className="max-w-xl opacity-90">
                Our in-store smart lockers let you collect online orders and drop off returns 7 days a week — no queue, no wait.
                Your locker code is sent via email and SMS — just scan and go. Available at all store locations.
              </p>
              <Button variant="outline" size="sm" className="mt-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* QR Code Feature */}
        <div className="mt-8 border border-border rounded-sm p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-muted rounded-sm flex items-center justify-center shrink-0">
            <QrCode className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-2xl mb-2">CREATE YOUR ACCOUNT IN-STORE</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Scan the QR code at any till or entrance kiosk to register your W.Y.W account on the spot — no app download required.
              Link your purchases to your rewards account instantly.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
