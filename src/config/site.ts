import type { LucideIcon } from "lucide-react";
import { BarChart3, Blocks, Camera, CircleGauge, Code2, Compass, Database, FilePenLine, Globe2, LayoutTemplate, Megaphone, Search, Server, Share2, Sparkles, Target, UsersRound, Wrench } from "lucide-react";

export const siteConfig = {
  name: "Souvik Saha",
  shortName: "SS",
  role: "Digital Development & Growth Partner",
  description: "Souvik Saha builds websites and digital products, then helps the businesses behind them grow through social media, digital marketing, and online promotion.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  navigation: [{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: "Services", href: "/services" }, { label: "Approach", href: "/approach" }, { label: "About", href: "/about" }, { label: "Insights", href: "/insights" }, { label: "Contact", href: "/contact" }],
} as const;

export type ServiceGroup = "Build" | "Grow";
export type Service = { slug: string; group: ServiceGroup; label: string; title: string; description: string; icon: LucideIcon; deliverables: string[] };
export const services: Service[] = [
  { slug: "web-development", group: "Build", label: "01 / Digital development", title: "Website Development", description: "End-to-end website development—from planning and interface implementation to the systems required to make it work in the real world.", icon: LayoutTemplate, deliverables: ["Website design and UI/UX implementation", "Responsive frontend development", "Backend development", "Deployment and ongoing improvements"] },
  { slug: "web-applications", group: "Build", label: "02 / Product systems", title: "Web Applications", description: "Thoughtful web applications and digital products shaped around a clear user journey and a practical business need.", icon: Blocks, deliverables: ["Digital product planning", "User-facing application flows", "Admin and dashboard systems", "Testing and iteration"] },
  { slug: "frontend-ui-ux", group: "Build", label: "03 / Interface craft", title: "Frontend & UI/UX", description: "Clear, responsive interfaces that translate a product idea into an experience people can understand and use with ease.", icon: Code2, deliverables: ["UI/UX implementation", "Responsive website interfaces", "Frontend development", "Website improvements"] },
  { slug: "backend-integrations", group: "Build", label: "04 / Foundations", title: "Backend & Integrations", description: "The foundations that let a digital product handle data, connect services, and support useful business workflows.", icon: Server, deliverables: ["Backend development", "Database integration", "API integration", "Authentication and maintenance"] },
  { slug: "social-media-management", group: "Grow", label: "01 / Social presence", title: "Social Media Management", description: "A clear, consistent social presence designed around the way your business needs to show up—not just how often it needs to post.", icon: Share2, deliverables: ["Instagram and Facebook management", "Content planning and publishing", "Community engagement", "Growth and optimization"] },
  { slug: "digital-marketing", group: "Grow", label: "02 / Campaigns", title: "Digital Marketing", description: "Focused promotional strategy that connects a strong message, the right audience, and a practical path to action.", icon: Megaphone, deliverables: ["Campaign strategy", "Audience targeting", "Promotion planning", "Performance analysis"] },
  { slug: "startup-marketing", group: "Grow", label: "03 / Launch & grow", title: "Startup Marketing", description: "A steady marketing foundation for early-stage businesses ready to articulate their value and earn early attention.", icon: Sparkles, deliverables: ["Launch campaigns", "Brand awareness", "Content systems", "Growth planning"] },
  { slug: "business-promotion", group: "Grow", label: "04 / Visibility", title: "Business Promotion", description: "Practical online promotion that helps local and growing businesses become more visible, relevant, and easier to choose.", icon: Target, deliverables: ["Promotional campaigns", "Customer engagement", "Local visibility", "Business messaging"] },
  { slug: "google-presence", group: "Grow", label: "05 / Discoverability", title: "Google Presence", description: "A more credible, discoverable digital footprint for customers already looking for the service you provide.", icon: Search, deliverables: ["Google Business Profile strategy", "Local visibility", "Search-oriented promotion", "Google marketing support"] },
];

export const serviceGroups = [
  { name: "Build" as const, eyebrow: "Digital development", title: "Build the digital presence.", copy: "Websites, web applications, and the product foundations that give a business a useful place to grow from.", icon: Code2 },
  { name: "Grow" as const, eyebrow: "Marketing & growth", title: "Grow the business behind it.", copy: "Social media, digital marketing, and promotion built around practical visibility, attention, and momentum.", icon: Megaphone },
] as const;

export const platformPlaybook = [
  { title: "Instagram", descriptor: "Build familiarity", icon: Camera, copy: "Visual storytelling, purposeful Reels, considered posts, and a content rhythm that makes your brand feel active and recognizable." },
  { title: "Facebook", descriptor: "Grow trust", icon: UsersRound, copy: "Community-facing content, campaign distribution, audience conversation, and promotion shaped for the people most likely to care." },
  { title: "Google", descriptor: "Be found", icon: Globe2, copy: "A stronger local and search-facing presence that helps customers find, understand, and choose your business with confidence." },
] as const;

export const approachSteps = [
  { number: "01", title: "Discover", copy: "Understand the business, audience, product or presence, and the outcomes that actually matter." }, { number: "02", title: "Plan", copy: "Set the product, platform, content, and promotional direction before beginning the work." }, { number: "03", title: "Build", copy: "Develop the website, digital experience, or content foundations needed to show up with more clarity." }, { number: "04", title: "Launch", copy: "Bring the work into the world with a considered rollout, campaign, or ongoing operating rhythm." }, { number: "05", title: "Measure", copy: "Review how the product or promotion is performing and where attention turns into useful action." }, { number: "06", title: "Improve", copy: "Use the learning to refine what is built and how it grows—keeping the work useful, not merely busy." },
] as const;

export type Insight = { slug: string; category: string; title: string; excerpt: string; body: string[] };
export const insights: Insight[] = [
  { slug: "building-a-website-that-supports-growth", category: "Web development", title: "A business website should make the next customer decision easier", excerpt: "A practical look at the role a clear digital foundation plays before marketing begins to send people there.", body: ["A business website is often where attention turns into judgement. People arrive with a question: what does this business do, is it relevant to me, and what should I do next? A good website makes those answers easy to find.", "That begins with clear structure. The message, navigation, content, and calls to action should work together, so people are not asked to decode the business before they can engage with it.", "Marketing can create attention, but the digital foundation has to earn the next step. Building both with the same intent makes the work more connected."] },
  { slug: "instagram-content-that-builds-recognition", category: "Instagram marketing", title: "Content that builds recognition before it asks for attention", excerpt: "A practical framework for making your Instagram presence feel coherent, human, and worth returning to.", body: ["Recognition is built through repetition with purpose. The aim is not to make every post look identical, but to make the brand feel familiar when people encounter it again.", "A useful content rhythm balances helpful information, evidence of the work, a clear point of view, and occasional promotional moments. Each part gives the audience a different reason to stay connected.", "Consistency is not simply frequency. It is the practice of showing up with the same level of clarity, care, and relevance over time."] },
  { slug: "social-media-strategy-for-startups", category: "Startup marketing", title: "Why early-stage social media needs a system—not just more posts", excerpt: "How to turn scattered activity into a steadier marketing rhythm that supports a growing business.", body: ["Early-stage teams usually have more ideas than operating time. A simple social media system helps decide what is worth sharing, when it should be shared, and how each piece supports the wider business.", "The system does not need to be complicated. It can be a focused set of themes, an achievable content rhythm, and a way to learn from the questions and responses that arrive.", "That structure creates more useful momentum than a sequence of isolated posts made under pressure."] },
  { slug: "google-presence-for-local-businesses", category: "Google visibility", title: "The overlooked moments that shape local business discovery", excerpt: "A closer look at the signals that help potential customers understand and choose a local business online.", body: ["Local discovery is often shaped before a customer ever visits a website. Search results, business information, reviews, and the quality of a Google presence all influence whether the business feels clear and credible.", "Accurate details and useful updates reduce friction for people who are ready to decide. They also give the wider digital presence a stronger foundation to connect to.", "The goal is straightforward: make it easier for the right customer to find the business, understand it, and take the next step."] },
];

export const homePrinciples = [
  { icon: LayoutTemplate, title: "Build what people need", copy: "From the first website page to a more involved web application, the work starts with what people need to understand and do." }, { icon: Database, title: "Connect the useful parts", copy: "A digital presence is more than the interface. It needs the right systems, data, and integrations behind it." }, { icon: CircleGauge, title: "Grow with intention", copy: "Once there is something useful to discover, marketing and social media can help the right people find their way to it." },
] as const;
export const analyticsIcon = BarChart3;
export const maintenanceIcon = Wrench;
export const planningIcon = Compass;
export const contentIcon = FilePenLine;
