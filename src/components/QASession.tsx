import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Clock, 
  Trash2,
  Star,
  Heart,
  ThumbsUp,
  Filter,
  Search,
  Mic,
  Users
} from "lucide-react";

interface Question {
  id: string;
  username: string;
  avatar: string;
  question: string;
  timestamp: Date;
  status: "pending" | "answered" | "dismissed";
  likes: number;
  isPinned: boolean;
  isHighlighted: boolean;
  answer?: string;
  answeredAt?: Date;
}

const QASession = ({ isLive }: { isLive: boolean }) => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      username: "GameFan2024",
      avatar: "/placeholder.svg",
      question: "What's your favorite gaming setup tip for beginners?",
      timestamp: new Date(Date.now() - 300000),
      status: "pending",
      likes: 12,
      isPinned: false,
      isHighlighted: false
    },
    {
      id: "2",
      username: "StreamViewer123",
      avatar: "/placeholder.svg",
      question: "How did you get started with streaming?",
      timestamp: new Date(Date.now() - 180000),
      status: "answered",
      likes: 8,
      isPinned: true,
      isHighlighted: true,
      answer: "I started streaming about 2 years ago as a hobby, and it grew from there!",
      answeredAt: new Date(Date.now() - 60000)
    },
    {
      id: "3",
      username: "TechEnthusiast",
      avatar: "/placeholder.svg",
      question: "What are your PC specs?",
      timestamp: new Date(Date.now() - 120000),
      status: "pending",
      likes: 15,
      isPinned: false,
      isHighlighted: false
    }
  ]);

  const [filter, setFilter] = useState<"all" | "pending" | "answered">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const filteredQuestions = questions
    .filter(q => filter === "all" || q.status === filter)
    .filter(q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                 q.username.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      // Sort by pinned first, then by likes, then by timestamp
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      if (a.likes !== b.likes) return b.likes - a.likes;
      return b.timestamp.getTime() - a.timestamp.getTime();
    });

  const answerQuestion = (questionId: string) => {
    if (!answer.trim()) return;

    setQuestions(prev => 
      prev.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              status: "answered" as const,
              answer: answer.trim(),
              answeredAt: new Date()
            }
          : q
      )
    );

    setAnswer("");
    setSelectedQuestion(null);
    setShowAnswerForm(false);
  };

  const togglePin = (questionId: string) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === questionId 
          ? { ...q, isPinned: !q.isPinned }
          : q
      )
    );
  };

  const toggleHighlight = (questionId: string) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === questionId 
          ? { ...q, isHighlighted: !q.isHighlighted }
          : q
      )
    );
  };

  const dismissQuestion = (questionId: string) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === questionId 
          ? { ...q, status: "dismissed" as const }
          : q
      )
    );
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const getTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const pendingCount = questions.filter(q => q.status === "pending").length;
  const answeredCount = questions.filter(q => q.status === "answered").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Q&A Session
          </h3>
          <p className="text-muted-foreground">Manage questions from your audience</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {pendingCount} pending
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {answeredCount} answered
          </Badge>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="answered">Answered</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Answer Form */}
      {showAnswerForm && selectedQuestion && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Answer Question
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={selectedQuestion.avatar} />
                  <AvatarFallback>{selectedQuestion.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedQuestion.username}</div>
                  <div className="text-sm text-muted-foreground">
                    {getTimeAgo(selectedQuestion.timestamp)}
                  </div>
                </div>
              </div>
              <p className="text-sm">{selectedQuestion.question}</p>
            </div>

            <div className="space-y-2">
              <Textarea
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => answerQuestion(selectedQuestion.id)}
                disabled={!answer.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Answer
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAnswerForm(false);
                  setSelectedQuestion(null);
                  setAnswer("");
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No questions found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filter !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "Questions from your audience will appear here when you're live."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredQuestions.map((question) => (
            <Card 
              key={question.id} 
              className={`${question.isPinned ? "border-primary" : ""} ${
                question.isHighlighted ? "bg-accent/5" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={question.avatar} />
                      <AvatarFallback>{question.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{question.username}</span>
                        <span className="text-sm text-muted-foreground">
                          {getTimeAgo(question.timestamp)}
                        </span>
                        {question.isPinned && (
                          <Badge variant="outline" className="text-xs">
                            Pinned
                          </Badge>
                        )}
                        <Badge 
                          variant={
                            question.status === "answered" ? "secondary" :
                            question.status === "pending" ? "outline" : "destructive"
                          }
                          className="text-xs"
                        >
                          {question.status}
                        </Badge>
                      </div>
                      <p className="text-sm mb-3">{question.question}</p>
                      
                      {question.answer && (
                        <div className="bg-muted/50 p-3 rounded-lg mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Mic className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">Your Answer</span>
                            {question.answeredAt && (
                              <span className="text-xs text-muted-foreground">
                                {getTimeAgo(question.answeredAt)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm">{question.answer}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {question.likes}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 ml-4">
                    {question.status === "pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedQuestion(question);
                          setShowAnswerForm(true);
                        }}
                        disabled={!isLive}
                      >
                        <Mic className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePin(question.id)}
                    >
                      <Star className={`w-4 h-4 ${question.isPinned ? "fill-current" : ""}`} />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleHighlight(question.id)}
                    >
                      <Heart className={`w-4 h-4 ${question.isHighlighted ? "fill-current" : ""}`} />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteQuestion(question.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Q&A Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{questions.length}</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{pendingCount}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{answeredCount}</div>
              <div className="text-sm text-muted-foreground">Answered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {questions.reduce((sum, q) => sum + q.likes, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Likes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QASession;