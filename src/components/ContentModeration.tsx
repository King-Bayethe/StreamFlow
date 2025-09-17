import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X,
  Clock,
  MessageSquare,
  User,
  Calendar
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ModerationReport {
  id: string;
  content_type: string;
  content_id: string;
  reason: string;
  description: string;
  status: string;
  created_at: string;
  reporter_id: string;
  reported_user_id: string;
  reviewer_notes?: string;
  action_taken?: string;
  resolved_at?: string;
}

export const ContentModeration = () => {
  const [reports, setReports] = useState<ModerationReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<ModerationReport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<ModerationReport | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchTerm, statusFilter]);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('moderation_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error",
        description: "Failed to fetch moderation reports",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.content_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    setFilteredReports(filtered);
  };

  const updateReportStatus = async (reportId: string, status: string, actionTaken?: string) => {
    try {
      const updateData: any = {
        status,
        reviewer_id: (await supabase.auth.getUser()).data.user?.id,
        reviewer_notes: reviewerNotes || null
      };

      if (status === 'resolved') {
        updateData.resolved_at = new Date().toISOString();
        updateData.action_taken = actionTaken;
      }

      const { error } = await supabase
        .from('moderation_reports')
        .update(updateData)
        .eq('id', reportId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Report ${status} successfully`,
      });

      await fetchReports();
      setSelectedReport(null);
      setReviewerNotes('');
    } catch (error) {
      console.error('Error updating report:', error);
      toast({
        title: "Error",
        description: "Failed to update report",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'reviewed': return 'default';
      case 'resolved': return 'secondary';
      case 'dismissed': return 'outline';
      default: return 'outline';
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'chat_message': return <MessageSquare className="h-4 w-4" />;
      case 'stream': return <Eye className="h-4 w-4" />;
      case 'profile': return <User className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-pulse">Loading moderation reports...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Content Moderation
          </CardTitle>
          <CardDescription>
            Review and manage user reports and content violations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reports Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content Type</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reported</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getContentTypeIcon(report.content_type)}
                        <span className="capitalize">{report.content_type.replace('_', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{report.reason}</p>
                        {report.description && (
                          <p className="text-sm text-muted-foreground truncate max-w-xs">
                            {report.description}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(report.status)}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(report.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Review Moderation Report</DialogTitle>
                            <DialogDescription>
                              Examine the report details and take appropriate action
                            </DialogDescription>
                          </DialogHeader>
                          {selectedReport && (
                            <div className="space-y-6">
                              {/* Report Details */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Content Type</label>
                                  <p className="text-sm text-muted-foreground capitalize">
                                    {selectedReport.content_type.replace('_', ' ')}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <div className="mt-1">
                                    <Badge variant={getStatusBadgeVariant(selectedReport.status)}>
                                      {selectedReport.status}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Reason</label>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedReport.reason}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Reported At</label>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(selectedReport.created_at).toLocaleString()}
                                  </p>
                                </div>
                              </div>

                              {selectedReport.description && (
                                <div>
                                  <label className="text-sm font-medium">Description</label>
                                  <p className="text-sm text-muted-foreground mt-1 p-3 bg-muted rounded-lg">
                                    {selectedReport.description}
                                  </p>
                                </div>
                              )}

                              {/* Reviewer Notes */}
                              <div>
                                <label className="text-sm font-medium">Reviewer Notes</label>
                                <Textarea
                                  placeholder="Add your notes about this report..."
                                  value={reviewerNotes}
                                  onChange={(e) => setReviewerNotes(e.target.value)}
                                  className="mt-1"
                                />
                              </div>

                              {/* Action Buttons */}
                              {selectedReport.status === 'pending' && (
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => updateReportStatus(selectedReport.id, 'reviewed')}
                                    variant="outline"
                                  >
                                    <Clock className="h-4 w-4 mr-2" />
                                    Mark as Reviewed
                                  </Button>
                                  <Button
                                    onClick={() => updateReportStatus(selectedReport.id, 'resolved', 'Content removed')}
                                    variant="destructive"
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Resolve (Remove Content)
                                  </Button>
                                  <Button
                                    onClick={() => updateReportStatus(selectedReport.id, 'dismissed')}
                                    variant="secondary"
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Dismiss
                                  </Button>
                                </div>
                              )}

                              {selectedReport.status === 'reviewed' && (
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => updateReportStatus(selectedReport.id, 'resolved', 'User warned')}
                                    variant="default"
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Resolve (User Warned)
                                  </Button>
                                  <Button
                                    onClick={() => updateReportStatus(selectedReport.id, 'resolved', 'Content removed')}
                                    variant="destructive"
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Resolve (Remove Content)
                                  </Button>
                                  <Button
                                    onClick={() => updateReportStatus(selectedReport.id, 'dismissed')}
                                    variant="secondary"
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Dismiss
                                  </Button>
                                </div>
                              )}

                              {/* Previous Actions */}
                              {selectedReport.action_taken && (
                                <div className="border-t pt-4">
                                  <label className="text-sm font-medium">Previous Action</label>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {selectedReport.action_taken}
                                  </p>
                                  {selectedReport.reviewer_notes && (
                                    <p className="text-sm text-muted-foreground mt-2 italic">
                                      "{selectedReport.reviewer_notes}"
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No moderation reports found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};