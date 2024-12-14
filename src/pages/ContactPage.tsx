import { FC, useState } from 'react';
import AnimatedSection from '@/components/animation/AnimatedSection';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';
import { Mail, ArrowRight, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';

// Schema and Types
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  organization: z.string().optional(),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  message: z.string().min(1, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Constants
const services = [
  { id: 'webApp', label: 'Web Application' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'webapp', label: 'Web Development' },
  { id: 'fullstack', label: 'Full Stack Solution' },
];

const pricingGuide = [
  {
    type: 'Basic Website',
    range: '€400 - €600',
    duration: '2-3 weeks',
    includes: ['Landing Page', 'Contact Form', 'Basic SEO', 'Mobile Responsive']
  },
  {
    type: 'Advanced Website',
    range: '€600 - €900',
    duration: '1-2 months',
    includes: ['Multiple Pages', 'CMS Integration', 'Advanced SEO', 'Performance Optimization']
  },
  {
    type: 'Full Stack Application',
    range: '€900 - €1200',
    duration: '2-3 months',
    includes: ['Custom Backend', 'Database', 'User Authentication', 'API Integration']
  }
];

// PricingAccordion
const PricingAccordion: FC<{ tier: typeof pricingGuide[0] }> = ({ tier }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-light-text-primary/10 dark:border-dark-text-primary/10 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-start py-4 text-left group"
      >
        <div>
          <h3 className="text-xl font-light group-hover:text-light-accent-blue dark:group-hover:text-dark-accent-blue transition-colors">
            {tier.type}
          </h3>
          <p className="text-light-accent-blue dark:text-dark-accent-blue font-medium mt-1">
            {tier.range}
          </p>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary transition-transform group-hover:text-light-accent-blue dark:group-hover:text-dark-accent-blue ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>
      
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-light-text-muted dark:text-dark-text-muted mb-4">
            {tier.duration}
          </p>
          <ul className="space-y-2 pt-2">
            {tier.includes.map((feature, index) => (
              <li 
                key={index}
                className="text-light-text-secondary dark:text-dark-text-secondary flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-light-accent-blue/50 dark:bg-dark-accent-blue/50" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Main Contact Component
const ContactPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
        data,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string
      );
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    }
  };

  return (
    <main className="container mx-auto px-4 py-20">
      {/* Hero Section */}
      <AnimatedSection className="mb-24">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-8">
          Let's project <br />together
        </h1>
        <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl">
          Have a project in mind? I'm ready to help bring your ideas to life with professional 
          full-stack development solutions at competitive rates.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <AnimatedSection>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            {/* Numbered form fields */}
            <div className="space-y-12">
              <div className="relative">
                <span className="text-sm text-light-text-muted dark:text-dark-text-muted absolute -top-6 left-0">01</span>
                <label className="text-2xl font-light mb-4 block">What's your name?</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full bg-transparent border-b border-light-text-primary/20 dark:border-dark-text-primary/20 py-3 focus:outline-none focus:border-light-accent-blue dark:focus:border-dark-accent-blue transition-colors"
                  placeholder="John Doe *"
                />
                {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="relative">
                <span className="text-sm text-light-text-muted dark:text-dark-text-muted absolute -top-6 left-0">02</span>
                <label className="text-2xl font-light mb-4 block">What's your email?</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full bg-transparent border-b border-light-text-primary/20 dark:border-dark-text-primary/20 py-3 focus:outline-none focus:border-light-accent-blue dark:focus:border-dark-accent-blue transition-colors"
                  placeholder="john@doe.com *"
                />
                {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="relative">
                <span className="text-sm text-light-text-muted dark:text-dark-text-muted absolute -top-6 left-0">03</span>
                <label className="text-2xl font-light mb-4 block">What's the name of your organization?</label>
                <input
                  type="text"
                  {...register('organization')}
                  className="w-full bg-transparent border-b border-light-text-primary/20 dark:border-dark-text-primary/20 py-3 focus:outline-none focus:border-light-accent-blue dark:focus:border-dark-accent-blue transition-colors"
                  placeholder="John & Doe ®"
                />
              </div>

              <div className="relative">
                <span className="text-sm text-light-text-muted dark:text-dark-text-muted absolute -top-6 left-0">04</span>
                <label className="text-2xl font-light mb-4 block">Your message</label>
                <textarea
                  {...register('message')}
                  className="w-full bg-transparent border-b border-light-text-primary/20 dark:border-dark-text-primary/20 py-3 focus:outline-none focus:border-light-accent-blue dark:focus:border-dark-accent-blue transition-colors resize-none"
                  placeholder="Hello Mats, can you help me with... *"
                  rows={4}
                />
                {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-4 bg-light-accent-blue dark:bg-dark-accent-blue text-white rounded-full hover:bg-light-accent-purple dark:hover:bg-dark-accent-purple transition-colors"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </AnimatedSection>

     {/* Pricing Guide */}
     <AnimatedSection className="space-y-12">
     <div className="space-y-8">
       <h2 className="text-2xl font-light">Pricing Guide</h2>
       
       {/* Mobile Pricing */}
       <div className="lg:hidden">
         {pricingGuide.map((tier) => (
           <PricingAccordion key={tier.type} tier={tier} />
         ))}
       </div>
       
       {/* Desktop Pricing */}
       <div className="hidden lg:block space-y-8">
         {pricingGuide.map((tier) => (
           <div 
             key={tier.type} 
             className="border-b border-light-text-primary/10 dark:border-dark-text-primary/10 pb-8"
           >
             <div className="flex justify-between items-start mb-4">
               <h3 className="text-xl font-light">{tier.type}</h3>
               <div className="text-right">
                 <p className="text-light-accent-blue dark:text-dark-accent-blue font-medium">
                   {tier.range}
                 </p>
                 <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                   {tier.duration}
                 </p>
               </div>
             </div>
             <ul className="space-y-2">
               {tier.includes.map((feature, index) => (
                 <li 
                   key={index}
                   className="text-light-text-secondary dark:text-dark-text-secondary flex items-center gap-2"
                 >
                   <span className="w-1 h-1 rounded-full bg-light-accent-blue/50 dark:bg-dark-accent-blue/50" />
                   {feature}
                 </li>
               ))}
             </ul>
           </div>
         ))}
       </div>
     </div>

     {/* Direct Contact */}
     <div className="pt-8">
       <h2 className="text-2xl font-light mb-4">Direct Contact</h2>
       <a 
         href="mailto:contact@nordiccodeworks.com"
         className="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-blue dark:hover:text-dark-accent-blue transition-colors"
       >
         <Mail className="w-5 h-5" />
         contact@nordiccodeworks.com
       </a>
       <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">
         Available Monday to Friday, 9:00 - 17:00 CET
       </p>
     </div>
   </AnimatedSection>
 </div>
</main>
);
};

export default ContactPage;