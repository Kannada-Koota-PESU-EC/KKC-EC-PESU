export interface UpiInfo {
  id: string;
  upiId: string;
  name: string;
  description: string;
  qrCodeImage: string;
  isDefault: boolean;
}

export const upiData: UpiInfo[] = [
  {
    id: 'primary',
    upiId: 'NA',
    name: 'Kannada Koota EC PES - Primary',
    description: 'Primary account for general donations and event sponsorships',
    qrCodeImage: '/Hero/KK1.jpeg',
    isDefault: true
  },
  {
    id: 'events',
    upiId: 'NA',
    name: 'Kannada Koota EC PES - Events',
    description: 'Dedicated account for event registrations and workshop fees',
    qrCodeImage: '/Hero/KK1.jpeg',
    isDefault: false
  }
];

export const getDefaultUpi = (): UpiInfo => {
  return upiData.find(upi => upi.isDefault) || upiData[0];
};

export const getAllUpis = (): UpiInfo[] => {
  return upiData;
};

export const getUpiById = (id: string): UpiInfo | undefined => {
  return upiData.find(upi => upi.id === id);
};

export const donationInfo = {
  title: 'Support Kannada Koota EC PES',
  description: 'Your donations help us organize cultural events, workshops, and community activities that celebrate and preserve Kannada heritage.',
  usageAreas: [
    'Cultural event organization and venue booking',
    'Traditional costume and prop rentals',
    'Guest speaker honorariums',
    'Workshop materials and supplies',
    'Food and refreshments for events',
    'Community outreach programs',
    'Educational material development',
    'Technology and equipment for digital initiatives'
  ],
  paymentInstructions: {
    kannada: 'ದಾನಿಗಳು ದಯವಿಟ್ಟು ಪಾವತಿ ವಿವರಣೆಯಲ್ಲಿ "PESU-EC : ಘಟನೆಯ ಹೆಸರು" ಅನ್ನು ಉಲ್ಲೇಖಿಸಿ',
    english: 'Please mention "PESU-EC :EventName" in payment description for proper tracking'
  },
  contactInfo: {
    email: 'kannadakoota.ecc@pes.edu',
    phone: '+91-9876543210',
    treasurer: '?'
  }
};