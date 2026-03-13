import { useState, useRef, useEffect } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Camera, X, RefreshCw, AlertCircle } from 'lucide-react';
import UpiFallback from './UpiFallback';

interface UpiScannerProps {
  onScanSuccess?: (upiId: string) => void;
}

export default function UpiScanner({ onScanSuccess }: UpiScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if camera is available
    checkCameraAvailability();
    
    return () => {
      // Cleanup stream on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const checkCameraAvailability = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setHasCamera(videoDevices.length > 0);
    } catch (err) {
      setHasCamera(false);
      setError('Unable to check camera availability');
    }
  };

  const startScanning = async () => {
    try {
      setError('');
      setIsScanning(true);

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      // Note: In a real implementation, you would use a QR code scanning library
      // like qr-scanner or jsqr here. For this demo, we'll show the interface
      
    } catch (err) {
      setError('Camera access denied or not available');
      setIsScanning(false);
      setHasCamera(false);
    }
  };

  const stopScanning = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const simulateScan = () => {
    // Simulate successful scan for demo purposes
    const mockUpiId = 'kannadakoota@pes';
    onScanSuccess?.(mockUpiId);
    setIsScanning(false);
  };

  // If no camera or camera access denied, show fallback
  if (hasCamera === false) {
    return <UpiFallback />;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {!isScanning ? (
        /* Scanner Start Screen */
        <div className="card-elevated p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Camera className="h-8 w-8 text-primary" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              QR Code Scanner
            </h3>
            <p className="text-muted-foreground text-sm">
              Scan QR codes to quickly access UPI payment information
            </p>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3">
            <Button 
              onClick={startScanning}
              className="w-full btn-hero"
              disabled={hasCamera === null}
            >
              {hasCamera === null ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Checking Camera...
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4 mr-2" />
                  Start Scanning
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setHasCamera(false)}
            >
              Use Manual Entry Instead
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            We'll request camera permission to scan QR codes
          </p>
        </div>
      ) : (
        /* Active Scanner Screen */
        <div className="card-elevated overflow-hidden">
          <div className="relative">
            {/* Video Stream */}
            <video
              ref={videoRef}
              className="w-full h-64 object-cover bg-muted"
              autoPlay
              playsInline
              muted
            />
            
            {/* Scanning Overlay */}
            <div className="absolute inset-0 border-2 border-primary/50">
              {/* Corner markers */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-4 border-t-4 border-primary"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-r-4 border-t-4 border-primary"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-4 border-b-4 border-primary"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-4 border-b-4 border-primary"></div>
              
              {/* Scanning line */}
              <div className="absolute inset-x-8 top-1/2 h-0.5 bg-primary animate-pulse"></div>
            </div>

            {/* Close button */}
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 w-8 h-8 p-0 bg-background/80 backdrop-blur-sm"
              onClick={stopScanning}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Position the QR code within the frame to scan
            </p>
            
            {/* Demo button - remove in production */}
            <Button
              onClick={simulateScan}
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              Demo: Simulate Successful Scan
            </Button>
            
            <Button
              onClick={stopScanning}
              variant="outline"
              className="w-full"
            >
              Cancel Scanning
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}