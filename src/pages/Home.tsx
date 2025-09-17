import ViewerHub from "@/pages/ViewerHub";
import SEOHead from "@/components/SEOHead";

const Home = () => {
  return (
    <>
      <SEOHead 
        title="StreamFlow - Your Personalized Streaming Dashboard | AI-Powered Live Streaming"
        description="Access your personalized StreamFlow dashboard. Discover live streams, manage your library, get AI-powered recommendations, and stay connected with your favorite creators."
        keywords={["streaming dashboard", "live streams", "AI recommendations", "creator platform", "viewer hub"]}
      />
      <ViewerHub />
    </>
  );
};

export default Home;