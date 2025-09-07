import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play, Twitter, Instagram, Youtube, Facebook } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Start Streaming", href: "/dashboard" },
        { name: "Browse Streams", href: "/browse" },
        { name: "Creator Dashboard", href: "/dashboard" },
        { name: "My Profile", href: "/profile" },
        { name: "Analytics", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Community Guidelines", href: "#" },
        { name: "Safety Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Report Issue", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Partnerships", href: "#" },
        { name: "Investor Relations", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "DMCA", href: "#" },
        { name: "Community Standards", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" }
  ];

  return (
    <footer className="bg-gradient-to-br from-primary/5 to-secondary/5 border-t">
      {/* Newsletter Section */}
      <div className="border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Stay in the Loop</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest updates on new features, creator spotlights, and platform news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero" className="px-8">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mr-3">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-2xl font-bold">StreamPay</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              The premier platform for live streaming with integrated monetization. Connect, create, and earn with your audience.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground">
            <p>&copy; 2024 StreamPay. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>🔒 Enterprise Security</span>
            <span>✓ GDPR Compliant</span>
            <span>⚡ 99.9% Uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;