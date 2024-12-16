import { FC, useState } from 'react';
import AnimatedSection from '@/components/animation/AnimatedSection';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';
import { Mail, ArrowRight, Rocket, Code, Database, Globe } from 'lucide-react';
import { toast } from 'react-toastify';

// Schema and Types
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  organization: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Project Types Information
const projectTypes = [
  {
    icon: Globe,
    title: "Web Solutions",
    description: "Modern, responsive websites and progressive web applications designed for optimal user experience.",
    features: ["Single Page Applications", "Progressive Web Apps", "Business Websites", "Portfolio Sites"]
  },
  {
    icon: Code,
    title: "Custom Development",
    description: "Tailored software solutions built with cutting-edge technologies to meet your specific needs.",
    features: ["Full Stack Applications", "API Development", "E-commerce Solutions", "CMS Integration"]
  },
  {
    icon: Database,
    title: "System Architecture",
    description: "Robust and scalable system designs that form the backbone of your digital infrastructure.",
    features: ["Database Design", "Cloud Solutions", "System Integration", "Performance Optimization"]
  }
];

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
      <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-8 text-light-text-primary dark:text-dark-text-heading leading-[1.1]">
          <span className="block opacity-0 animate-[fadeInUp_0.5s_0.2s_forwards]">Let's start a</span>
          <span className="block md:relative md:left-[10%] opacity-0 animate-[fadeInUp_0.5s_0.4s_forwards]">project</span>
          <span className="block md:relative md:left-[20%] opacity-0 animate-[fadeInUp_0.5s_0.6s_forwards]">together</span>
        </h1>
        <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl">
          Have a project in mind? I'm ready to help bring your ideas to life with professional 
          full-stack development solutions.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <AnimatedSection>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 relative">
            <div className="space-y-12">
              {/* Form Fields */}
              <div className="group relative">
                <label className="text-sm font-medium text-light-text-muted dark:text-dark-text-muted transition-colors 
                  group-focus-within:text-light-accent-blue dark:group-focus-within:text-dark-accent-yellow">
                  01 — What's your name?
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full mt-2 bg-transparent border-0 border-b-[3px] border-light-text-primary/10 
                    dark:border-dark-text-primary/10 py-3 px-0
                    focus:outline-none focus:ring-0 focus:border-light-accent-blue dark:focus:border-dark-accent-yellow 
                    text-2xl font-light text-light-text-primary dark:text-dark-text-heading transition-all
                    placeholder-light-text-primary/20 dark:placeholder-dark-text-primary/20"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="absolute -bottom-6 left-0 text-sm text-status-error">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="group relative">
                <label className="text-sm font-medium text-light-text-muted dark:text-dark-text-muted transition-colors 
                  group-focus-within:text-light-accent-blue dark:group-focus-within:text-dark-accent-yellow">
                  02 — What's your email?
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full mt-2 bg-transparent border-0 border-b-[3px] border-light-text-primary/10 
                    dark:border-dark-text-primary/10 py-3 px-0
                    focus:outline-none focus:ring-0 focus:border-light-accent-blue dark:focus:border-dark-accent-yellow 
                    text-2xl font-light text-light-text-primary dark:text-dark-text-heading transition-all
                    placeholder-light-text-primary/20 dark:placeholder-dark-text-primary/20"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="absolute -bottom-6 left-0 text-sm text-status-error">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="group relative">
                <label className="text-sm font-medium text-light-text-muted dark:text-dark-text-muted transition-colors 
                  group-focus-within:text-light-accent-blue dark:group-focus-within:text-dark-accent-yellow">
                  03 — Organization (optional)
                </label>
                <input
                  type="text"
                  {...register('organization')}
                  className="w-full mt-2 bg-transparent border-0 border-b-[3px] border-light-text-primary/10 
                    dark:border-dark-text-primary/10 py-3 px-0
                    focus:outline-none focus:ring-0 focus:border-light-accent-blue dark:focus:border-dark-accent-yellow 
                    text-2xl font-light text-light-text-primary dark:text-dark-text-heading transition-all
                    placeholder-light-text-primary/20 dark:placeholder-dark-text-primary/20"
                  placeholder="Company name"
                />
              </div>

              <div className="group relative">
                <label className="text-sm font-medium text-light-text-muted dark:text-dark-text-muted transition-colors 
                  group-focus-within:text-light-accent-blue dark:group-focus-within:text-dark-accent-yellow">
                  04 — Tell me about your project
                </label>
                <textarea
                  {...register('message')}
                  className="w-full mt-2 bg-transparent border-0 border-b-[3px] border-light-text-primary/10 
                    dark:border-dark-text-primary/10 py-3 px-0
                    focus:outline-none focus:ring-0 focus:border-light-accent-blue dark:focus:border-dark-accent-yellow 
                    text-2xl font-light text-light-text-primary dark:text-dark-text-heading transition-all resize-none
                    placeholder-light-text-primary/20 dark:placeholder-dark-text-primary/20"
                  placeholder="I need help with..."
                  rows={4}
                />
                {errors.message && (
                  <p className="absolute -bottom-6 left-0 text-sm text-status-error">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>


<button
  type="submit"
  disabled={isSubmitting}
  aria-label="Send Message"
  className="group flex items-center gap-2 px-8 py-4 bg-light-accent-blue dark:bg-dark-accent-blue text-white 
    rounded-full hover:bg-light-accent-purple dark:hover:bg-dark-accent-purple transition-all duration-300 
    disabled:opacity-50 relative overflow-hidden"
>
  <span className="relative z-10">
    {isSubmitting ? 'Sending...' : 'Send Message'}
  </span>
  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
  <div className="absolute inset-0 bg-gradient-to-r from-light-accent-blue to-light-accent-purple 
    dark:from-dark-accent-blue dark:to-dark-accent-purple opacity-0 group-hover:opacity-100 transition-opacity" />
</button>
          </form>
        </AnimatedSection>

        {/* Project Types Section */}
        <AnimatedSection className="space-y-16">
          <div className="space-y-12 max-w-xl">
            
            <div className="space-y-12">
              {projectTypes.map((type, index) => (
                <div key={index} className="group">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-4">
                      <type.icon className="w-8 h-8 text-light-accent-blue dark:text-dark-accent-yellow 
                        group-hover:text-light-accent-purple dark:group-hover:text-dark-accent-purple transition-all duration-300" />
                      <h3 className="text-2xl font-light text-light-text-primary dark:text-dark-text-heading">
                        {type.title}
                      </h3>
                    </div>
                    
                    <p className="text-light-text-secondary dark:text-dark-text-secondary pl-12 text-base leading-relaxed">
                      {type.description}
                    </p>
                    
                    <div className="pl-12 grid grid-cols-2 gap-2">
                      {type.features.map((feature, i) => (
                        <span 
                          key={i} 
                          className="text-sm text-light-text-muted dark:text-dark-text-muted
                            group-hover:text-light-accent-blue dark:group-hover:text-dark-accent-yellow 
                            transition-colors duration-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Contact Section - Updated styling */}
          <div className="pt-8 border-t border-light-text-primary/10 dark:border-dark-text-primary/10">
            <h2 className="text-3xl font-light text-light-text-primary dark:text-dark-text-heading mb-6">
              Direct Contact
            </h2>
            <a 
              href="mailto:contact@nordiccodeworks.com"
              aria-label="Send Email"
              className="group inline-flex items-center gap-3 text-lg text-light-text-secondary dark:text-dark-text-secondary 
                hover:text-light-accent-blue dark:hover:text-dark-accent-yellow transition-all duration-300"
            >
              <Mail className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              contact@nordiccodeworks.com
            </a>
            <p className="mt-4 text-light-text-muted dark:text-dark-text-muted">
              Available Monday to Friday, 9:00 - 17:00 CET
            </p>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
};

export default ContactPage;