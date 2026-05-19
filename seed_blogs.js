import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./models/Blog.js";

// Load dotenv
dotenv.config();

const defaultBlogs = [
  {
    id: 1,
    title: "5 Benefits of Boxing for Weight Loss",
    excerpt: "Discover how boxing can help you burn up to 800 calories per session while building lean muscle and boosting metabolism.",
    content: `When it comes to shedding pounds, traditional cardio workouts like jogging or cycling can quickly become repetitive and yield plateaued results. Enter boxing: a high-octane, full-body metabolic powerhouse that challenges your muscles, mind, and cardiovascular capacity simultaneously.

1. Full-Body Muscle Activation
Unlike workouts that isolate specific body parts, every single punch in boxing recruits your entire kinetic chain. A jab starts from the ground, travels through your calves and thighs, engages your core, and releases through your shoulder and arm. This total-body recruitment burns up to 30% more calories than isolated weight training.

2. The Legendary EPOC Afterburn Effect
Thanks to the high-intensity interval training (HIIT) nature of boxing rounds, your body enters a state of oxygen debt. This triggers Excess Post-exercise Oxygen Consumption (EPOC), meaning your body continues to incinerate calories for up to 24 to 36 hours after you hang up your gloves.

3. Fat Shredding Without Muscle Loss
One of the primary concerns with pure calorie restriction or heavy steady-state cardio is muscle wasting. Boxing acts as natural resistance training. The high-resistance impact on heavy bags preserves and builds lean muscle mass while burning body fat, resulting in a shredded, athletic physique.

4. Extreme Stress Reduction
Stress produces cortisol, a hormone that actively promotes visceral fat storage. Hitting a heavy bag is one of the most effective physical releases of stress and tension. By lowering cortisol levels, you naturally prime your body to burn fat more efficiently.

5. Unmatched Cardiovascular Endurance
Boxing demands quick bursts of speed combined with sustained movement. This unique blend of aerobic and anaerobic training optimizes your resting heart rate and lung capacity, giving you the stamina of a true champion.`,
    category: "fitness",
    readTime: "5 min read",
    author: "Alice Kamali",
    date: new Date("2024-01-20"),
    image: "https://i.postimg.cc/YCjZBPJf/Screenshot_2026_03_01_170658.png",
    featured: true,
    status: "published",
    slug: "boxing-weight-loss-benefits"
  },
  {
    id: 2,
    title: "How to Properly Wrap Your Hands: A Step-by-Step Guide",
    excerpt: "Learn the correct way to wrap your hands to prevent injuries and maximize punching power during training.",
    content: `Your hands are your primary tools inside the ring. Proper hand wrapping is not just a boxing ritual—it's a critical safety measure that stabilizes the small bones, tendons, and joints in your hands and wrists against heavy impacts.

Step 1: The Thumb Anchor
Hook the loop around your thumb, ensuring you wrap across the back of your hand rather than the palm. Wrapping the back of the hand ensures the wrap tightens automatically when you form a closed fist.

Step 2: Wrist Stability
Make three to four solid wraps around your wrist. This forms the foundation of support, preventing hyper-flexion or hyperextension when landing heavy hooks and crosses.

Step 3: Knuckle Protection
Bring the wrap up across the back of your hand and wrap around your knuckles three to four times. Make sure your fingers are slightly spread while wrapping to keep the padding comfortable and prevent pinching.

Step 4: Inter-Finger Locking
Weave the wrap between each of your fingers, starting from the pinky-ring gap. Loop back down to the wrist after each finger. This secures the knuckles in place, ensuring they do not collide or fracture upon impact.

Step 5: Lock and Fasten
Finish the remaining length of the wrap around the wrist and fasten the Velcro securely. Clench your fist a few times to test: it should feel snug and secure, without cutting off your circulation.`,
    category: "technique",
    readTime: "4 min read",
    author: "ALI The Coach",
    date: new Date("2024-01-18"),
    image: "https://i.postimg.cc/DwmH3N9n/Screenshot_2026_03_01_170739.png",
    featured: true,
    status: "published",
    slug: "how-to-wrap-hands"
  },
  {
    id: 3,
    title: "Nutrition Tips for Boxers: Fueling Your Training",
    excerpt: "Essential nutrition strategies to optimize performance, recovery, and weight management for boxers.",
    content: `A boxer's body is a high-performance machine. To survive grueling rounds of bag work, sparring, and conditioning, you must fuel yourself with high-grade nutrition. Here's how to structure your diet like a professional fighter.

1. Pre-Workout Fuel: Complex Carbohydrates
Carbohydrates are your primary energy source. Consume slow-digesting complex carbs like oatmeal, brown rice, or sweet potatoes 2 to 3 hours before training. This delivers a steady release of glucose to keep you running strong through the final round.

2. Post-Workout Recovery: The Golden Ratio
After a grueling session, your muscle glycogen is depleted and muscle fibers have micro-tears. Aim for a 3:1 ratio of carbohydrates to clean protein within 45 minutes of training (e.g., grilled chicken breast with quinoa, or a premium whey protein shake with a banana).

3. High-Quality Lean Proteins
Support lean muscle repair with top-tier protein sources. Incorporate wild-caught fish, organic chicken, lean beef, eggs, and plant-based options like lentils and tofu into your daily meals.

4. Tactical Hydration
Dehydration of just 2% can reduce your punch power and decision-making speed by up to 20%. Drink at least 3-4 liters of pure water daily, and replenish electrolytes during high-intensity training sessions.`,
    category: "nutrition",
    readTime: "6 min read",
    author: "Sophie Niyonsaba",
    date: new Date("2024-01-15"),
    image: "https://i.postimg.cc/zXx6MNPR/Screenshot_2026_03_01_170810.png",
    featured: false,
    status: "published",
    slug: "nutrition-tips-for-boxers"
  },
  {
    id: 4,
    title: "Meet Marie: From Beginner to National Competitor in 18 Months",
    excerpt: "Inspiring journey of how Marie transformed her life through boxing and became a national-level competitor.",
    content: `Eighteen months ago, Marie walked through the doors of BodyMax Boxing Club with no martial arts experience, seeking a fun way to get in shape. Today, she is a gold-medal amateur champion representing the club at national tournaments. This is her extraordinary story.

Phase 1: Overcoming the Initial Fear
"I remember standing outside the gym for ten minutes before building up the courage to go in," Marie recalls. "I thought boxing was only for aggressive, experienced fighters. But the coaches welcomed me with open arms and focused entirely on teaching me basic footwork and breathing."

Phase 2: Falling in Love with the Discipline
Within three months, Marie went from attending beginner classes to training four times a week. The structured routine of skipping rope, hitting speedbags, and perfecting the jab built not only a phenomenal physique but an unbreakable mental focus.

Phase 3: The Spark of Competition
Coach ALI noticed Marie's natural timing and intense drive. Under his guidance, Marie entered the sparring circle. "Sparring taught me how to stay calm under pressure. It's the ultimate chess match," she explains.

Phase 4: Championship Glory
After months of rigorous preparation, Marie entered her first official tournament. Winning by unanimous decision, she stood at the top of the podium. Her journey is living proof that with passion, dedication, and elite coaching, anyone can achieve greatness.`,
    category: "success",
    readTime: "8 min read",
    author: "Jean Claude",
    date: new Date("2024-01-12"),
    image: "https://i.postimg.cc/FsT8qvnK/Screenshot_2026_03_01_171211.png",
    featured: true,
    status: "published",
    slug: "marie-success-story"
  },
  {
    id: 5,
    title: "What to Expect in Your First Boxing Class",
    excerpt: "A complete guide for beginners on what to bring, what to wear, and what happens during your first boxing session.",
    content: `Walking into your very first boxing class can feel intimidating, but knowing what to expect can turn that anxiety into pure excitement. Here is your ultimate beginner's guide to crushing your first day at BodyMax.

1. What to Wear and Bring
Wear comfortable, breathable athletic apparel (t-shirt, shorts or leggings) and supportive athletic sneakers. Bring a personal water bottle and a sweat towel. Don't worry about buying gloves yet—the club provides high-quality sanitized training gloves for beginners!

2. The Warm-Up Foundation
Class begins with a dynamic warm-up designed to prime your shoulders, hips, and core. Expect a mix of light jogging, shadowboxing, jumping jacks, and dynamic stretches.

3. Mastering the Basic Stance and Punching
Your coach will teach you the orthodox or southpaw stance, showing you how to balance your weight. You will then practice the basic punches: the Jab (1), Cross (2), Hook (3), and Uppercut (4).

4. Heavy Bag Work and Conditioning
You will put your punches to the test on the heavy bag, learning how to control impact and distance. The class wraps up with a high-energy conditioning circle and a relaxing cool-down stretch. You'll leave feeling exhausted, empowered, and ready for more!`,
    category: "beginners",
    readTime: "4 min read",
    author: "David Rodriguez",
    date: new Date("2024-01-10"),
    image: "https://i.postimg.cc/Kv0wVbs0/Screenshot_2026_03_01_171313.png",
    featured: false,
    status: "published",
    slug: "first-boxing-class-guide"
  },
  {
    id: 6,
    title: "The Mental Benefits of Boxing: More Than Just Physical",
    excerpt: "Explore how boxing training can reduce stress, build confidence, and improve mental resilience.",
    content: `While the physical changes from boxing are easily visible in the mirror, the most profound transformations happen inside the mind. Boxing is an incredibly therapeutic and mentally strengthening discipline.

1. Dynamic Stress and Anxiety Relief
There is no better outlet for daily frustrations than channeling that energy into a heavy bag workout. The physical act of striking releases endorphins, instantly elevating your mood and melting away mental fatigue.

2. Active Mindfulness and Flow State
Boxing requires 100% of your attention. When a glove is coming at you or you are executing complex combinations, you cannot think about work stress or bills. You are forced into the absolute present—a form of active meditation that clears mental clutter.

3. Building Unshakeable Self-Confidence
Learning how to punch, slip, and defend yourself builds a deep sense of capability. As you master complex technical skills, your self-image expands, translating directly into how you carry yourself in business and personal life.

4. Developing Grit and Resilience
Boxing pushes you to your physical limits. Overcoming the urge to quit when your shoulders burn and lungs scream builds a formidable mental resilience that helps you navigate life's toughest challenges with absolute grace.`,
    category: "fitness",
    readTime: "5 min read",
    author: "Alice Kamali",
    date: new Date("2024-01-08"),
    image: "https://i.postimg.cc/zXx6MNPd/Screenshot_2026_03_01_171657.png",
    featured: false,
    status: "published",
    slug: "mental-benefits-of-boxing"
  },
  {
    id: 7,
    title: "Essential Boxing Equipment for Beginners",
    excerpt: "Your complete checklist of must-have boxing gear and what to look for when making purchases.",
    content: `Investing in the right gear is essential to keep you safe, comfortable, and performing at your best as you advance in your training. Here is a curated guide to the absolute essentials for every new boxer.

1. Boxing Gloves: Finding Your Size
For general training, heavy bag work, and pad work, beginners should look for 12oz or 14oz gloves. If you plan to spar in the future, a heavier 16oz glove is mandatory to ensure safety for both you and your partner. Look for reputable brands with solid wrist support.

2. Hand Wraps: Non-Negotiable Protection
Never hit a bag without hand wraps! Standard 180-inch semi-elastic (Mexican style) wraps are perfect. They provide the right balance of knuckle padding and wrist stability.

3. Mouthguard: Protect Your Smile
Even if you are only doing light technical partner drills without full contact, a high-quality "boil-and-bite" mouthguard is crucial. It protects your teeth and absorbs impact, minimizing concussion risks.

4. Footwear: Speed and Stability
While standard running shoes work initially, their thick, cushioned soles can cause ankle rolls during rapid pivots. Transitioning to dedicated boxing shoes or minimalist training shoes with thin flat soles will dramatically improve your balance and footwork.`,
    category: "beginners",
    readTime: "6 min read",
    author: "ALI The Coach",
    date: new Date("2024-01-05"),
    image: "https://i.postimg.cc/wv6DS1vD/Screenshot_2026_03_01_174550.png",
    featured: false,
    status: "published",
    slug: "beginner-boxing-equipment"
  },
  {
    id: 8,
    title: "Recovery Strategies for Boxers: Maximize Your Gains",
    excerpt: "Learn proper recovery techniques including stretching, nutrition, and rest to improve performance.",
    content: `In boxing, your progress doesn't actually happen during the workout—it happens during the recovery. Hard training breaks down muscle fibers; proper recovery builds them back stronger. Optimize your gains with these professional recovery protocols.

1. The Art of the Warm-Down
Never walk straight out of the gym after a hard session. Spend 10 minutes performing static stretches for your calves, hamstrings, shoulders, and hip flexors. This helps flush out lactic acid and maintains functional flexibility.

2. Contrast Therapy (Hot/Cold)
Alternating between hot and cold water (or using ice baths) constricts and dilates blood vessels, acting as a natural pump that sweeps metabolic waste out of your muscles and dramatically accelerates tissue repair.

3. Sleep Optimization
Sleep is the ultimate performance-enhancing drug. Human Growth Hormone (HGH) release peaks during deep sleep. Aim for 8 hours of quality rest in a cool, dark room to maximize neurological and muscular recovery.

4. Active Recovery Days
On rest days, avoid complete couch-potato mode. Engage in light, low-impact activities like swimming, walking, or mobility work. This maintains blood flow to sore muscles without adding cumulative stress.`,
    category: "fitness", or: "lifestyle",
    category: "fitness",
    readTime: "7 min read",
    author: "Sophie Niyonsaba",
    date: new Date("2024-01-03"),
    image: "https://i.postimg.cc/fyymR1YW/Screenshot_2026_03_01_174723.png",
    featured: false,
    status: "published",
    slug: "boxing-recovery-strategies"
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/BodyMax_BC";
    console.log("Connecting to MongoDB:", mongoUri);
    await mongoose.connect(mongoUri);

    console.log("Successfully connected. Cleaning existing blogs...");
    await Blog.deleteMany({});
    console.log("Existing blogs deleted.");

    console.log("Seeding default premium blogs...");
    await Blog.insertMany(defaultBlogs);
    console.log("🎉 Database seeded successfully with 8 premium articles!");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
