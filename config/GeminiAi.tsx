const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "create kids story on description for 5-8 year old kids, Educational story, and all images in paper cut style: story of boy and magic school, give me 5 chapter, with detailed image text prompt for each of chapter and image prompt for story cover with story name, all in JSON field format." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"title\": \"Leo and the School of Sparkle\",\n  \"cover\": {\n    \"image_prompt\": \"Paper cut style illustration for a children's book cover. A young boy, Leo, with bright eyes and messy brown hair, stands in front of a whimsical school building made of colorful paper cut shapes. The school has towers shaped like pencils and windows shaped like stars. Sparkles and glitter accents. The title 'Leo and the School of Sparkle' is written in a playful, cut-paper font.\"\n  },\n  \"chapters\": [\n    {\n      \"chapter_number\": 1,\n      \"chapter_title\": \"The Lost Button and the Whispering Wind\",\n      \"story\": \"Leo loved collecting buttons. He had a whole jar full! One windy afternoon, his favorite button, a sparkly blue one shaped like a star, blew away. Leo chased it, and the wind seemed to whisper, 'Follow me... to Sparkle School!' It led him to a hidden path behind the old oak tree in his backyard.\",\n      \"image_prompt\": \"Paper cut style illustration. Leo, a small boy with a jar of colorful buttons, is chasing a sparkly blue, star-shaped button that is blowing away in the wind. The background shows a vibrant green backyard with a large oak tree. A faint, swirling wind effect is around the button. The path behind the tree is just barely visible.\"\n    },\n    {\n      \"chapter_number\": 2,\n      \"chapter_title\": \"Doors that Giggled and a Teacher Made of Rainbows\",\n      \"story\": \"The path led Leo to a tall gate made of twirling ribbons. The gate opened with a giggle! Behind it stood Sparkle School, a building like no other. Inside, he met Miss Rainbow, a teacher made of shimmering light. 'Welcome, Leo!' she chirped. 'Here, we learn by playing and creating!'\",\n      \"image_prompt\": \"Paper cut style illustration. A gate made of colorful, swirling ribbons is open, revealing Sparkle School. The school is made of various whimsical shapes and colors. Inside the entrance stands Miss Rainbow, a radiant figure made of different colored light beams, smiling warmly at Leo. The overall mood is bright and cheerful.\"\n    },\n    {\n      \"chapter_number\": 3,\n      \"chapter_title\": \"Painting with Sound and Sculpting with Clouds\",\n      \"story\": \"In Miss Rainbow's class, Leo learned amazing things. He painted pictures using music - loud notes made bold strokes, soft melodies created delicate details. He even sculpted fluffy clouds into funny animal shapes! He learned that art wasn't just about pencils and paper, but about using his imagination.\",\n      \"image_prompt\": \"Paper cut style illustration. Leo is in a classroom, surrounded by other children. He's holding a paintbrush towards a musical note floating in the air, and colorful paint is magically appearing on a canvas. In the background, other children are sculpting clouds into animal shapes, using small tools and lots of laughter. Miss Rainbow is supervising with a gentle smile.\"\n    },\n    {\n      \"chapter_number\": 4,\n      \"chapter_title\": \"The Scribble Monster and the Power of Kindness\",\n      \"story\": \"One day, a grumpy Scribble Monster stomped into the school, making everyone's art messy. He was made of angry scribbles and messy lines! Miss Rainbow taught Leo and his friends to draw kind words and happy pictures around the monster. Slowly, the Scribble Monster started to smile, and his scribbles turned into flowers.\",\n      \"image_prompt\": \"Paper cut style illustration. A Scribble Monster, made of messy black lines and angry scribbles, is standing in the middle of the Sparkle School classroom, scowling. Around him, Leo and other children are drawing colorful flowers, hearts, and kind words on paper. Some of the flowers are beginning to stick to the Scribble Monster.\"\n    },\n    {\n      \"chapter_number\": 5,\n      \"chapter_title\": \"Sparkles in My Pocket and a Button Found\",\n      \"story\": \"The Scribble Monster, now named Scribble Friend, thanked everyone. Leo learned that even grumpy things can be made happy with kindness. He said goodbye to Miss Rainbow and promised to visit again. As he walked home, he found his sparkly blue button in his pocket. Sparkle School had taught him that magic is all around, waiting to be discovered!\",\n      \"image_prompt\": \"Paper cut style illustration. Leo is hugging the now-friendly Scribble Friend, who is covered in flowers and smiling. Miss Rainbow is waving goodbye from the doorway of Sparkle School. Leo is holding his sparkly blue button in his hand, and the path back home is illuminated with sparkles. The overall scene is heartwarming and magical.\"\n    }\n  ]\n}\n```" },
            ],
        },
    ],
});



