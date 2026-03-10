import cliquelogo from '../assets/images/clique logo.png';

const projects = [
  {
    id: "clique-app",
    title: "Clique App",
    summary:
      "A social networking platform designed for platonic connection, connecting people based on shared interests.",
    role: "Full Stack Developer",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    image: cliquelogo,
    liveUrl: "http://cliqueapp.site/",
    repoUrl: "https://github.com/chatnchew/Clique-Capstone-Project",
    featured: true,
    category: "Full Stack",
    description:
      "Clique is a full-stack social networking application that helps users discover and connect with new friends who share their interests. Built with the MERN stack, it features real-time updates, user authentication, and a responsive design. I contributed heavily to the User Profile component, working on both front and back end elements.",
  },
  {
    id: "giphy-searcher",
    title: "GIPHY Searcher",
    summary:
      "A simple front end project that allows searching the GIPHY databse with their API.",
    role: "Front End Developer",
    stack: ["React", "Node.js", "RESTful APIs"],
    image: "",
    liveUrl: "",
    repoUrl: "https://github.com/chatnchew/Giphy-Searcher",
    featured: true,
    category: "Front End",
    description:
      "This was the practical portion for my final assessment. I've since revised the code to be more elegant using GitHub Copliot, but the underlying logic remains my own.",
  },
  // Add more projects as needed
];

export default projects;
