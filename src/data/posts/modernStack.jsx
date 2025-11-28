export const modernStackPost = {
    id: 'modern-web-stack-2024',
    title: 'Building with the Modern Web Stack: Convex, Tailwind v4, and MongoDB',
    excerpt: 'Exploring the cutting-edge technologies that are reshaping web development in 2024. From real-time databases to utility-first CSS frameworks, here\'s my journey with the modern web stack.',
    content: `# Building with the Modern Web Stack: Convex, Tailwind v4, and MongoDB

The web development landscape is evolving rapidly, and 2024 has brought some incredible tools that are changing how we build applications. In this post, I'll share my experience working with three game-changing technologies: Convex, Tailwind CSS v4, and MongoDB.

## Why This Stack?

After building several projects, I've learned that the right tools can make or break your development experience. This stack offers:

- **Real-time capabilities** with Convex
- **Modern styling** with Tailwind v4
- **Flexible data storage** with MongoDB
- **Type safety** throughout the stack
- **Excellent developer experience**

## Convex: The Real-Time Backend

### What is Convex?

Convex is a revolutionary backend platform that combines a database, serverless functions, and real-time subscriptions in one package. Think of it as Firebase meets tRPC, but better.

### Why I Love Convex

\`\`\`typescript
// Define your schema
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    author: v.string(),
    body: v.string(),
    timestamp: v.number(),
  }),
});
\`\`\`

**Key Benefits:**

1. **Automatic Type Safety** - TypeScript types are generated from your schema
2. **Real-Time by Default** - No WebSocket configuration needed
3. **Serverless Functions** - Write backend logic without managing servers
4. **Built-in Auth** - Authentication that just works

### Real-Time Queries

One of Convex's killer features is reactive queries:

\`\`\`typescript
// In your React component
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function Messages() {
  const messages = useQuery(api.messages.list);
  
  // Automatically updates when data changes!
  return (
    <div>
      {messages?.map(msg => (
        <div key={msg._id}>{msg.body}</div>
      ))}
    </div>
  );
}
\`\`\`

### Mutations Made Easy

Writing data is just as simple:

\`\`\`typescript
// convex/messages.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const send = mutation({
  args: { body: v.string(), author: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      body: args.body,
      author: args.author,
      timestamp: Date.now(),
    });
  },
});
\`\`\`

## Tailwind CSS v4: The Future of Styling

### What's New in v4?

Tailwind v4 brings significant improvements:

- **Lightning-fast builds** with the new Rust-based engine
- **Native CSS variables** for better browser compatibility
- **Simplified configuration** with CSS-based setup
- **Better IntelliSense** support

### The New Configuration Approach

Instead of "tailwind.config.js", v4 uses CSS:

\`\`\`css
@import "tailwindcss";

@theme {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --font-display: "Inter", sans-serif;
}
\`\`\`

### Why This Matters

1. **Faster Builds** - Up to 10x faster than v3
2. **Better DX** - No more JavaScript config files
3. **Smaller Bundle** - Optimized output
4. **Native Features** - Uses modern CSS features

### Practical Example

\`\`\`jsx
// Modern component with Tailwind v4
function Card({ title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}
\`\`\`

## MongoDB: Flexible Data Storage

### Why MongoDB?

While Convex has its own database, sometimes you need MongoDB's power for:

- **Complex aggregations**
- **Full-text search**
- **Geospatial queries**
- **Legacy system integration**

### Schema Design Patterns

\`\`\`javascript
// User schema with embedded documents
{
  _id: ObjectId("..."),
  username: "ayushmaan",
  email: "ayush@example.com",
  profile: {
    bio: "Full-stack developer",
    avatar: "https://...",
    social: {
      github: "ayushmaan218",
      twitter: "@ayushmaan"
    }
  },
  projects: [
    {
      name: "Portfolio",
      tech: ["React", "Tailwind", "Convex"],
      url: "https://..."
    }
  ],
  createdAt: ISODate("2024-01-01"),
  updatedAt: ISODate("2024-11-28")
}
\`\`\`

### Aggregation Pipeline Magic

\`\`\`javascript
// Get top 5 users by project count
db.users.aggregate([
  {
    $addFields: {
      projectCount: { $size: "$projects" }
    }
  },
  {
    $sort: { projectCount: -1 }
  },
  {
    $limit: 5
  },
  {
    $project: {
      username: 1,
      projectCount: 1,
      "profile.avatar": 1
    }
  }
]);
\`\`\`

## Bringing It All Together

### The Architecture

\`\`\`
┌─────────────┐
│   React +   │
│  Tailwind   │
│     v4      │
└──────┬──────┘
       │
       ├──────────┐
       │          │
┌──────▼──────┐   │
│   Convex    │   │
│  (Real-time │   │
│   Backend)  │   │
└─────────────┘   │
                  │
           ┌──────▼──────┐
           │   MongoDB   │
           │  (Complex   │
           │   Queries)  │
           └─────────────┘
\`\`\`

### Example: Real-Time Chat App

\`\`\`typescript
// Convex function for sending messages
export const sendMessage = mutation({
  args: {
    roomId: v.id("rooms"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");
    
    // Store in Convex for real-time
    const messageId = await ctx.db.insert("messages", {
      roomId: args.roomId,
      userId: user.subject,
      content: args.content,
      timestamp: Date.now(),
    });
    
    // Also store in MongoDB for analytics
    await storeInMongoDB({
      messageId,
      roomId: args.roomId,
      userId: user.subject,
      content: args.content,
    });
    
    return messageId;
  },
});
\`\`\`

## Performance Considerations

### Convex Performance

- **Edge deployment** - Low latency worldwide
- **Automatic caching** - Smart query optimization
- **Reactive updates** - Only sends changed data

### Tailwind v4 Performance

- **JIT compilation** - Only generates used classes
- **Smaller bundles** - Optimized CSS output
- **Better tree-shaking** - Removes unused styles

### MongoDB Performance

- **Indexing strategy** - Create indexes for common queries
- **Connection pooling** - Reuse database connections
- **Aggregation optimization** - Use $match early in pipeline

## Lessons Learned

1. **Start with Convex** - Use it as your primary backend
2. **Use MongoDB selectively** - Only for complex queries
3. **Embrace Tailwind v4** - The new approach is worth learning
4. **Type safety everywhere** - TypeScript + Convex = ❤️
5. **Monitor performance** - Use built-in analytics

## Challenges and Solutions

### Challenge 1: Learning Curve

**Problem**: New paradigms take time to learn

**Solution**: Start small, build incrementally, read docs thoroughly

### Challenge 2: Migration from v3

**Problem**: Tailwind v4 has breaking changes

**Solution**: Use the migration guide, update gradually

### Challenge 3: Data Consistency

**Problem**: Keeping Convex and MongoDB in sync

**Solution**: Use Convex as source of truth, MongoDB for analytics

## The Future

This stack represents the future of web development:

- **Real-time by default**
- **Type-safe throughout**
- **Developer-friendly**
- **Production-ready**

## Conclusion

Building with Convex, Tailwind v4, and MongoDB has been an incredible experience. The combination offers:

- ⚡ **Speed** - Both in development and runtime
- 🔒 **Type Safety** - Catch errors before they happen
- 🎨 **Great DX** - Tools that get out of your way
- 🚀 **Scalability** - Ready for production

If you're starting a new project in 2024, I highly recommend giving this stack a try!

## Resources

- [Convex Documentation](https://docs.convex.dev)
- [Tailwind CSS v4 Beta](https://tailwindcss.com/blog/tailwindcss-v4-beta)
- [MongoDB University](https://university.mongodb.com)
- [My GitHub](https://github.com/ayushmaan218)

Happy building! 🎉`,
    date: '2024-11-28',
    readTime: '12 min read',
    author: 'Ayushmaan Mohanty',
    tags: ['Convex', 'Tailwind v4', 'MongoDB', 'Web Development', 'Modern Stack']
};
