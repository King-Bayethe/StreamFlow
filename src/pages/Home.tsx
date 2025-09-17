import ViewerHub from "@/pages/ViewerHub";
import SEOHead from "@/components/SEOHead";

const Home = () => {
  return (
    <>
      <SEOHead 
        title="Home - Your Personalized Streaming Dashboard"
        description="Discover live streams, manage your library, get personalized recommendations, and stay connected with your favorite creators."
      />
      <ViewerHub />
    </>
  );
};

export default Home;