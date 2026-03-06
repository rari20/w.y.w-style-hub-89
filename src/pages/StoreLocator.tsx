import Layout from '@/components/Layout';
import { stores } from '@/data/products';
import { MapPin, Phone, Clock, Package, Zap } from 'lucide-react';

export default function StoreLocator() {
  return (
    <Layout>
      <div className="wyw-container py-8">
        <h1 className="text-5xl md:text-6xl font-display mb-4">FIND A STORE</h1>
        <p className="text-muted-foreground mb-12 max-w-lg">
          Visit us in person for the full W.Y.W experience — shop, style, and collect.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map(store => (
            <div key={store.id} className="wyw-card p-6">
              <h2 className="font-display text-2xl mb-4">{store.name.toUpperCase()}</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>{store.hours}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Services</p>
                <div className="flex flex-wrap gap-2">
                  {store.services.map(service => (
                    <span key={service} className="text-xs bg-muted px-2 py-1 rounded-sm flex items-center gap-1">
                      {service === 'W.Y.W Lockers' ? <Package className="h-3 w-3 text-accent" /> : <Zap className="h-3 w-3 text-accent" />}
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* W.Y.W Lockers Info */}
        <div className="mt-16 bg-accent text-accent-foreground p-8 rounded-sm">
          <div className="flex items-start gap-4">
            <Package className="h-8 w-8 shrink-0 mt-1" />
            <div>
              <h2 className="font-display text-3xl mb-2">W.Y.W LOCKERS</h2>
              <p className="max-w-xl">
                Our self-service lockers make Click & Collect pickups and returns effortless. 
                Your locker code is sent via email and SMS — just scan and go. Available at all store locations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
