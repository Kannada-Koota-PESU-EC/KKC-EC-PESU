import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/shared/hooks/use-toast';
import { sendContactNotification } from '../services/emailService';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ (Please fill all fields)',
        description: 'All fields are required to send your message.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    setIsSent(false);

    try {
      const result = await sendContactNotification({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      if (result.success) {
        setIsSent(true);
        toast({
          title: 'ಸಂದೇಶ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ · Message Sent!',
          description: 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶ ನಮಗೆ ತಲುಪಿದೆ. (Notification sent to vikasnnaik201@gmail.com).',
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        // Fallback: If backend endpoint is unreachable or 404, launch mailto to vikasnnaik201@gmail.com
        const subjectEnc = encodeURIComponent(`[Kannada Koota Website] ${formData.subject.trim()}`);
        const bodyEnc = encodeURIComponent(`From: ${formData.name.trim()} (${formData.email.trim()})\n\nMessage:\n${formData.message.trim()}`);
        window.location.href = `mailto:vikasnnaik201@gmail.com?subject=${subjectEnc}&body=${bodyEnc}`;
        toast({
          title: 'ಇಮೇಲ್ ಅಪ್ಲಿಕೇಶನ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ (Opening Email)',
          description: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ನೇರವಾಗಿ vikasnnaik201@gmail.com ಗೆ ಕಳುಹಿಸಲು ಇಮೇಲ್ ಅಪ್ಲಿಕೇಶನ್ ತೆರೆಯಲಾಗಿದೆ.',
        });
      }
    } catch (err: unknown) {
      const subjectEnc = encodeURIComponent(`[Kannada Koota Website] ${formData.subject.trim()}`);
      const bodyEnc = encodeURIComponent(`From: ${formData.name.trim()} (${formData.email.trim()})\n\nMessage:\n${formData.message.trim()}`);
      window.location.href = `mailto:vikasnnaik201@gmail.com?subject=${subjectEnc}&body=${bodyEnc}`;
      toast({
        title: 'ಇಮೇಲ್ ಅಪ್ಲಿಕೇಶನ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ (Opening Email)',
        description: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ನೇರವಾಗಿ vikasnnaik201@gmail.com ಗೆ ಕಳುಹಿಸಲು ಇಮೇಲ್ ಅಪ್ಲಿಕೇಶನ್ ತೆರೆಯಲಾಗಿದೆ.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="koota-subpage koota-contact min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-surface via-background to-accent-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-center space-x-2 text-accent">
              <MessageCircle className="h-8 w-8" />
              <h1 className="text-4xl md:text-6xl font-bold">ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions, suggestions, or want to get involved? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card-elevated p-8 koota-contact-form">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="mt-1"
                  />
                </div>
                
                {isSent && (
                  <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶ ಯಶಸ್ವಿಯಾಗಿ ತಲುಪಿದೆ. (Thank you! We have received your message.)</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-hero"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message · ಸಂದೇಶ ಕಳುಹಿಸಿ
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="card-elevated p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-muted-foreground">kannadakoota.ecc@pes.edu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Location</h3>
                      <p className="text-muted-foreground">
                        PES University<br />
                        Electronic City Campus<br />
                        Bangalore, Karnataka
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
