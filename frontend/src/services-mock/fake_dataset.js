import gen1 from "../assets/images/gen_ai/1.png"
import gen2 from "../assets/images/gen_ai/2.png"
import gen3 from "../assets/images/gen_ai/3.png"
import gen4 from "../assets/images/gen_ai/4.png"
import trump1 from "../assets/images/trump1.png"

import sf1 from "../assets/images/sf/1.png"
import sf2 from "../assets/images/sf/2.png"
import mckinsey from "../assets/images/mckinsey.png"

import lancedb1 from "../assets/images/lancedb/1.png"
import lancedb2 from "../assets/images/lancedb/2.png"

const generative_ai = [
    {
     url: "https://www.netguru.com/blog/generative-ai-startups",
     title: "31 Remarkable Generative AI Startups You Simply Can't Ignore",
     description: "You’ll be surprised at what some of these companies are doing with generative AI. Content creation is just the tip of the iceberg.",
     image: gen1
    },

    {
     url: "https://blog.enterprisedna.co/how-to-use-chat-gpt/",
     title: "How To Use Chat GPT: A Simple Guide For Beginners",
     description: "ChatGPT has taken the world by storm and has managed to become the fastest-growing application in the world in a shockingly short amount of time. With all the talk about its potential impact, it’s natural to wonder: how do you use ChatGPT?",
     image: gen2

    },
    {
      url: "https://arstechnica.com/tech-policy/2023/03/fake-ai-generated-images-imagining-donald-trumps-arrest-circulate-on-twitter/",
      title: "AI-faked images of Donald Trump’s imagined arrest swirl on Twitter",
      description: "Showing Trump resisting arrest and being dragged off by police, the realistic but very fake photos have already been viewed by millions.",
      image: trump1
    },

    {
      url: "https://hbr.org/2022/11/how-generative-ai-is-changing-creative-work",
      title: "How Generative AI Is Changing Creative Work",
      description: "Generative AI models for businesses threaten to upend the world of content creation, with substantial impacts on marketing, software, design, entertainment, and interpersonal communications.",
      image: gen3
    },

    {
      url: "https://www.forbes.com/sites/bernardmarr/2023/05/31/the-future-of-generative-ai-beyond-chatgpt/?sh=b97322c3da9a",
      title: "The Future Of Generative AI Beyond ChatGPT",
      description: "Generative tools like ChatGPT and Stable Diffusion have got everyone talking about artificial intelligence (AI) – but where is it headed next?",
      image: gen4
    }
]

const sf = [
    {
      url: "https://www.sfchronicle.com/sf/article/sfnext-poll-sentiment-17435794.php",
      title: "How fed up are San Franciscans with the city's problems? New S.F. Chronicle poll finds pervasive gloom",
      description: "San Francisco has long seen skirmishes among factions of its overwhelmingly Democratic electorate, but fissures are widening,",
      image: sf1,
    },
    {
      url: "https://www.tastingtable.com/1303053/best-restaurants-san-francisco-ranked/",
      title: "40 Absolute Best Restaurants In San Francisco, Ranked",
      description: "40 Absolute Best Restaurants In San Francisco, Ranked Static Media BY ISABELLA COOK/UPDATED: JUNE 2, 2023 9:11 AM EST",
      image: sf2
    }
]

const lancedb = [
  {
    url: "https://github.com/lancedb/lancedb",
    title: "lancedb/lancedb: Developer-friendly, serverless vector database for AI applications",
    description: "LanceDB is an open-source database for vector-search built with persistent storage, which greatly simplifies retrevial, filtering and management of embeddings.",
    image: lancedb1
  },
  {
    url: "https://lancedb.com/",
    title: "LanceDB",
    description: "LanceDB is a powerful, versatile, and user-friendly tool that has greatly enhanced our ability to handle large datasets and complex tasks.",
    image: lancedb2
  },
  {
    url: "https://lancedb.github.io/lancedb/",
    title: "LanceDB Documentation",
    description: "LanceDB is an open-source database for vector-search built with persistent storage, which greatly simplifies retrevial, filtering and management of embeddings.",
  }
]

const image_list = [
   mckinsey, gen1, gen2, , lancedb1, lancedb2, gen3,  sf1, gen4, sf2
]



export { generative_ai, sf, image_list, lancedb }

