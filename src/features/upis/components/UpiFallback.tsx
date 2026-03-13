import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Copy, Check, ExternalLink, Info } from 'lucide-react';
import { getDefaultUpi, getAllUpis, donationInfo } from '@/features/upis/data/upis';
import { useToast } from '@/shared/hooks/use-toast';

export default function UpiFallback() {
  const [copiedId, setCopiedId] = useState<string>('');
  const defaultUpi = getDefaultUpi();
  const allUpis = getAllUpis();
  const { toast } = useToast();

  const copyToClipboard = async (text: string, upiId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(upiId);
      
      toast({
        title: "Copied to clipboard!",
        description: `UPI ID: ${text}`,
      });
      
      setTimeout(() => setCopiedId(''), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the UPI ID manually",
        variant: "destructive",
      });
    }
  };

  const openUpiApp = (upiId: string) => {
    const upiUrl = `upi://pay?pa=${upiId}&pn=Kannada%20Koota%20EC%20PES&cu=INR`;
    window.open(upiUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Main UPI Card */}
      <div className="card-elevated p-6 text-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Support Us
          </h2>
          <p className="text-muted-foreground kannada-text">
            ನಮ್ಮ ಕ್ಲಬ್‌ಗೆ ಬೆಂಬಲ ನೀಡಿ
          </p>
        </div>

        {/* QR Code */}
        <div className="bg-muted p-4 rounded-lg inline-block">
          <img
            src={defaultUpi.qrCodeImage}
            alt={`QR Code for ${defaultUpi.name}`}
            className="w-48 h-48 mx-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/api/placeholder/300/300';
            }}
          />
        </div>

        {/* UPI ID */}
        <div className="space-y-3">
          <div className="bg-surface p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-2">UPI ID</p>
            <div className="flex items-center justify-between">
              <code className="text-lg font-mono text-foreground bg-muted px-3 py-2 rounded flex-1">
                {defaultUpi.upiId}
              </code>
              <Button
                onClick={() => copyToClipboard(defaultUpi.upiId, defaultUpi.id)}
                variant="outline"
                size="sm"
                className="ml-2"
              >
                {copiedId === defaultUpi.id ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => openUpiApp(defaultUpi.upiId)}
              className="btn-hero flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Pay via UPI App
            </Button>
            <Button
              onClick={() => copyToClipboard(defaultUpi.upiId, defaultUpi.id)}
              variant="outline"
              className="flex-1"
            >
              {copiedId === defaultUpi.id ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy UPI ID
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Alternative UPI Options */}
      {allUpis.length > 1 && (
        <div className="card-elevated p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Info className="h-5 w-5 text-primary" />
            <span>Alternative Payment Options</span>
          </h3>
          
          <div className="space-y-3">
            {allUpis.filter(upi => !upi.isDefault).map((upi) => (
              <div key={upi.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{upi.name}</h4>
                    <p className="text-sm text-muted-foreground">{upi.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <code className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded flex-1">
                    {upi.upiId}
                  </code>
                  <Button
                    onClick={() => copyToClipboard(upi.upiId, upi.id)}
                    variant="outline"
                    size="sm"
                    className="ml-2"
                  >
                    {copiedId === upi.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* How We Use Donations */}
      <div className="card-elevated p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          How Your Donations Help
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {donationInfo.description}
        </p>
        
        <div className="grid sm:grid-cols-2 gap-3">
          {donationInfo.usageAreas.slice(0, 6).map((area, index) => (
            <div key={index} className="flex items-start space-x-2 text-sm">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-muted-foreground">{area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="bg-primary-muted p-4 rounded-lg space-y-3">
        <h4 className="font-semibold text-foreground">Payment Instructions</h4>
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground kannada-text">
            {donationInfo.paymentInstructions.kannada}
          </p>
          <p className="text-muted-foreground">
            {donationInfo.paymentInstructions.english}
          </p>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Contact: {donationInfo.contactInfo.email}</p>
          <p>Treasurer: {donationInfo.contactInfo.treasurer}</p>
        </div>
      </div>
    </div>
  );
}