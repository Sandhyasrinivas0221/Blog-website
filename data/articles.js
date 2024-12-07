// data/articles.js
function createSlug(title) {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

let articles = [
    {
        id: 1,
        title: "Exploring the Cosmos: The Future of Space Travel",
        description: "An in-depth look at the advancements in space travel and what the future holds for human exploration beyond Earth.",
        markDown: "## Introduction\nThe human race has always been fascinated by the stars. With recent advancements, space travel is becoming more feasible and exciting.\n\n## The Current State\nCurrently, private companies are taking the lead in space exploration...\n\n## The Future\nThe possibilities are endless, from Mars colonization to interstellar travel.",
        date: new Date('2024-04-12'),
        slug: createSlug("Exploring the Cosmos: The Future of Space Travel")
    },
    {
        id: 2,
        title: "The Art of Mindfulness: Cultivating Peace in a Busy World",
        description: "Discover the transformative power of mindfulness and how it can bring serenity to your daily life.",
        markDown: "## Mindfulness Practices\nMindfulness involves being present in the moment. Here are some techniques:\n- Meditation\n- Deep Breathing\n- Mindful Eating\n\n## Benefits\nPracticing mindfulness can reduce stress, improve focus, and enhance overall well-being.",
        date: new Date('2024-05-25'),
        slug: createSlug("The Art of Mindfulness: Cultivating Peace in a Busy World")
    },
    {
        id: 3,
        title: "Sustainable Living: Simple Steps to Reduce Your Carbon Footprint",
        description: "Learn practical tips for adopting a sustainable lifestyle that benefits both you and the planet.",
        markDown: "## Introduction\nLiving sustainably is more important than ever. Here are some steps you can take:\n\n## Reduce, Reuse, Recycle\nThese three R's are the foundation of sustainable living. Start by...\n\n## Renewable Energy\nConsider using renewable energy sources to power your home.",
        date: new Date('2024-03-18'),
        slug: createSlug("Sustainable Living: Simple Steps to Reduce Your Carbon Footprint")
    }
];

export { articles, createSlug };
