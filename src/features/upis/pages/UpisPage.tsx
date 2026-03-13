import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import UpiScanner from '@/features/upis/components/UpiScanner';
import UpiFallback from '@/features/upis/components/UpiFallback';
import { CreditCard, QrCode, Heart, Users } from 'lucide-react';

export default function Upis() {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedResult, setScannedResult] = useState<string>('');

  const handleScanSuccess = (upiId: string) => {
    setScannedResult(upiId);
    setShowScanner(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-surface via-background to-success/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-center space-x-2 text-success">
              <Heart className="h-8 w-8" />
              <h1 className="text-4xl md:text-6xl font-bold">
                ನಮ್ಮ ಕ್ಲಬ್‌ಗೆ ಬೆಂಬಲ ನೀಡಿ
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Help us preserve and celebrate Kannada culture through your generous contributions
            </p>
            <p className="text-base text-muted-foreground kannada-text">
              ನಮ್ಮ ಸಾಂಸ್ಕೃತಿಕ ಚಟುವಟಿಕೆಗಳಿಗೆ ನಿಮ್ಮ ಬೆಂಬಲ ನೀಡಿ
            </p>
          </div>
        </div>
      </section>

      {/* Scanner Toggle Section */}
      <section className="py-8 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-semibold text-foreground">Choose Payment Method</h2>
              <p className="text-sm text-muted-foreground">Scan QR codes or use manual UPI entry</p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant={showScanner ? 'default' : 'outline'}
                onClick={() => setShowScanner(true)}
                className="flex items-center space-x-2"
              >
                <QrCode className="h-4 w-4" />
                <span>QR Scanner</span>
              </Button>
              <Button
                variant={!showScanner ? 'default' : 'outline'}
                onClick={() => setShowScanner(false)}
                className="flex items-center space-x-2"
              >
                <CreditCard className="h-4 w-4" />
                <span>Manual Entry</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Interface */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {scannedResult && (
            <div className="mb-8 p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2 text-success">
                <QrCode className="h-5 w-5" />
                <span className="font-semibold">Scan Successful!</span>
              </div>
              <p className="text-muted-foreground mt-1">
                Detected UPI ID: <code className="bg-muted px-2 py-1 rounded">{scannedResult}</code>
              </p>
            </div>
          )}

          <div className="animate-fade-in-up">
            {showScanner ? (
              <UpiScanner onScanSuccess={handleScanSuccess} />
            ) : (
              <UpiFallback />
            )}
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16 bg-primary-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Your Support Matters
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every contribution helps us create meaningful experiences and preserve our cultural heritage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-elevated p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Community Building</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your donations help us organize events that bring together students and create lasting bonds within our community.
              </p>
            </div>

            <div className="card-elevated p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Cultural Preservation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We use funds to document traditions, organize workshops, and ensure Kannada culture thrives in academic settings.
              </p>
            </div>

            <div className="card-elevated p-6 text-center space-y-4 md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <CreditCard className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Transparent Usage</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We maintain complete transparency in how donations are used and provide regular updates to our supporters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Have Questions About Donations?
          </h2>
          <p className="text-muted-foreground mb-8">
            We're here to answer any questions you might have about how your contributions are used.
          </p>
          <Button className="btn-accent" size="lg" asChild>
            <a href="/contact">Contact Our Team</a>
          </Button>
        </div>
      </section>
    </div>
  );
}