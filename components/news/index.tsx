"use client";

import { Card, CardFooter, Image } from "@heroui/react";

const News = () => {
  const fakeNews: {
    $id: string;
    title: string;
    description?: string;
    image_url?: string;
    created_at: Date;
  }[] = [
    {
      $id: "1",
      title: "Breaking News: Market Hits Record Highs",
      description:
        "The stock market reached an all-time high today, driven by strong earnings reports.",
      image_url:
        "https://mediacenter.batam.go.id/wp-content/uploads/sites/60/2025/02/475796015_1057403019753568_6623738602179016102_n.jpg",
      created_at: new Date(),
    },
    {
      $id: "2",
      title: "Local Hero Saves Child from Drowning",
      description:
        "A local man is being hailed as a hero after saving a child from drowning at the community pool.",
      image_url:
        "https://mediacenter.batam.go.id/wp-content/uploads/sites/60/2025/02/475796015_1057403019753568_6623738602179016102_n.jpg",
      created_at: new Date(),
    },
    {
      $id: "3",
      title: "New Tech Innovation Promises to Change the World",
      description:
        "A groundbreaking new technology is set to revolutionize the way we live and work.",
      image_url:
        "https://mediacenter.batam.go.id/wp-content/uploads/sites/60/2025/02/475796015_1057403019753568_6623738602179016102_n.jpg",
      created_at: new Date(),
    },
    {
      $id: "4",
      title: "Celebrity Couple Announces Engagement",
      description:
        "The celebrity world is abuzz with news of the latest high-profile engagement.",
      image_url:
        "https://mediacenter.batam.go.id/wp-content/uploads/sites/60/2025/02/475796015_1057403019753568_6623738602179016102_n.jpg",
      created_at: new Date(),
    },
    {
      $id: "5",
      title: "Major Weather Event Causes Disruptions",
      description:
        "Severe weather has caused significant disruptions across the region, with many areas experiencing power outages.",
      image_url:
        "https://mediacenter.batam.go.id/wp-content/uploads/sites/60/2025/02/475796015_1057403019753568_6623738602179016102_n.jpg",
      created_at: new Date(),
    },
    {
      $id: "6",
      title: "New Study Reveals Health Benefits of Coffee",
      description:
        "A recent study has found that drinking coffee may have numerous health benefits.",
      image_url:
        "https://mediacenter.batam.go.id/wp-content/uploads/sites/60/2025/02/475796015_1057403019753568_6623738602179016102_n.jpg",
      created_at: new Date(),
    },
    {
      $id: "7",
      title: "Sports Team Wins Championship",
      description:
        "The local sports team has won the championship, bringing joy to fans across the city.",
      image_url:
        "https://mediacenter.batam.go.id/wp-content/uploads/sites/60/2025/02/475796015_1057403019753568_6623738602179016102_n.jpg",
      created_at: new Date(),
    },
    {
      $id: "8",
      title: "Groundbreaking Medical Discovery Announced",
      description:
        "Scientists have announced a groundbreaking discovery that could lead to new treatments for various diseases.",
      image_url:
        "https://mediacenter.batam.go.id/wp-content/uploads/sites/60/2025/02/475796015_1057403019753568_6623738602179016102_n.jpg",
      created_at: new Date(),
    },
    {
      $id: "9",
      title: "New Restaurant Opens Downtown",
      description:
        "A new restaurant has opened in the downtown area, offering a unique dining experience.",
      image_url:
        "https://mediacenter.batam.go.id/wp-content/uploads/sites/60/2025/02/475796015_1057403019753568_6623738602179016102_n.jpg",
      created_at: new Date(),
    },
    {
      $id: "10",
      title: "Community Event Brings Neighbors Together",
      description:
        "A recent community event brought neighbors together for a day of fun and festivities.",
      image_url:
        "https://mediacenter.batam.go.id/wp-content/uploads/sites/60/2025/02/475796015_1057403019753568_6623738602179016102_n.jpg",
      created_at: new Date(),
    },
  ];

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {fakeNews.map((news) => (
          <Card
            key={news.$id}
            isBlurred
            isFooterBlurred
            isHoverable
            isPressable
          >
            <Image loading="lazy" src={news.image_url} />
            <CardFooter className="absolute z-10 bottom-0">
              <p className="line-clamp-2 font-medium text-start">
                {news.title}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default News;
