import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Textarea } from './components/ui/textarea';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { 
  Home, 
  Camera, 
  Users, 
  FileText, 
  User, 
  Bell, 
  MapPin, 
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  ThumbsUp,
  MessageCircle,
  Star,
  X,
  Check,
  Map,
  Filter,
  Eye,
  Phone,
  Mail,
  Mic,
  MicOff,
  Image,
  Upload,
  Settings,
  LogOut,
  Edit3,
  Save,
  Navigation,
  RefreshCw,
  Sparkles,
  AlertCircle
} from 'lucide-react';

type Screen = 'home' | 'ar' | 'community' | 'reports';

interface TimelineEvent {
  id: string;
  date: string;
  status: string;
  description: string;
  updatedBy?: string;
  images?: string[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  upvotes: number;
}

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: 'open' | 'in-progress' | 'resolved';
  reportedBy: string;
  reportedAt: string;
  upvotes: number;
  comments: number;
  imageUrl?: string;
  beforeImage?: string;
  afterImage?: string;
  isOwnReport?: boolean;
  needsVerification?: boolean;
  timeline?: TimelineEvent[];
  commentsList?: Comment[];
  priority?: 'low' | 'medium' | 'high';
  estimatedResolution?: string;
  assignedDepartment?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
}

export default function App() {
  // User profile state
  const [editingProfile, setEditingProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Priya Sharma",
    phone: '+91 98765 43210',
    email: 'priya.sharma@email.com',
    address: "Koramangala, Bangalore",
    ward: "Ward 15"
  });

  const myRecentIssues: Issue[] = [
    {
      id: '1',
      title: 'Pothole on Main Road',
      description: 'Large pothole causing traffic issues on the main road. The pothole is approximately 2 feet wide and 6 inches deep, making it dangerous for two-wheelers.',
      category: 'Roads',
      location: '100th Feet Road, Koramangala',
      status: 'in-progress',
      reportedBy: userProfile.name,
      reportedAt: '2024-01-10',
      upvotes: 12,
      comments: 3,
      isOwnReport: true,
      priority: 'high',
      estimatedResolution: '2024-01-20',
      assignedDepartment: 'BBMP Road Maintenance',
      contactInfo: {
        phone: '+91 80 2222 3333',
        email: 'roads@bbmp.gov.in'
      },
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      timeline: [
        {
          id: 't1',
          date: '2024-01-10',
          status: 'Reported',
          description: 'Issue reported by citizen',
          updatedBy: userProfile.name
        },
        {
          id: 't2',
          date: '2024-01-11',
          status: 'Acknowledged',
          description: 'Issue acknowledged by BBMP',
          updatedBy: 'BBMP Officer'
        },
        {
          id: 't3',
          date: '2024-01-12',
          status: 'In Progress',
          description: 'Work team assigned, materials ordered',
          updatedBy: 'Road Maintenance Team'
        }
      ],
      commentsList: [
        {
          id: 'c1',
          author: 'Raj Kumar',
          content: 'This pothole damaged my bike tire yesterday!',
          date: '2024-01-11',
          upvotes: 5
        },
        {
          id: 'c2',
          author: 'BBMP Officer',
          content: 'We have scheduled repairs for this week. Thank you for reporting.',
          date: '2024-01-12',
          upvotes: 8
        },
        {
          id: 'c3',
          author: 'Anita Singh',
          content: 'Please prioritize this, it\'s causing major traffic issues',
          date: '2024-01-13',
          upvotes: 3
        }
      ]
    },
    {
      id: '2',
      title: 'Garbage Not Collected',
      description: 'Waste has been piling up for 3 days in the residential area. The garbage is attracting flies and creating health hazards.',
      category: 'Waste Management',
      location: '5th Block, Koramangala',
      status: 'open',
      reportedBy: userProfile.name,
      reportedAt: '2024-01-08',
      upvotes: 8,
      comments: 1,
      isOwnReport: true,
      priority: 'medium',
      estimatedResolution: '2024-01-15',
      assignedDepartment: 'BBMP Waste Management',
      contactInfo: {
        phone: '+91 80 1111 2222',
        email: 'waste@bbmp.gov.in'
      },
      imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400',
      timeline: [
        {
          id: 't4',
          date: '2024-01-08',
          status: 'Reported',
          description: 'Garbage collection issue reported',
          updatedBy: userProfile.name
        },
        {
          id: 't5',
          date: '2024-01-09',
          status: 'Under Review',
          description: 'Issue forwarded to collection team',
          updatedBy: 'Waste Management Coordinator'
        }
      ],
      commentsList: [
        {
          id: 'c4',
          author: 'Kumar M',
          content: 'Same issue in our area too. Collection schedule seems irregular.',
          date: '2024-01-09',
          upvotes: 4
        }
      ]
    }
  ];

  const communityIssues: Issue[] = [
    {
      id: '3',
      title: 'Street Light Not Working',
      description: 'Street light has been out for a week, creating safety concerns for pedestrians during night hours.',
      category: 'Public Safety',
      location: '6th Block, Koramangala',
      status: 'open',
      reportedBy: 'Raj Kumar',
      reportedAt: '2024-01-09',
      upvotes: 15,
      comments: 5,
      priority: 'high',
      estimatedResolution: '2024-01-18',
      assignedDepartment: 'BESCOM Street Lighting',
      contactInfo: {
        phone: '+91 80 3333 4444',
        email: 'streetlights@bescom.org'
      },
      imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=400',
      timeline: [
        {
          id: 't6',
          date: '2024-01-09',
          status: 'Reported',
          description: 'Street light outage reported',
          updatedBy: 'Raj Kumar'
        },
        {
          id: 't7',
          date: '2024-01-10',
          status: 'Acknowledged',
          description: 'Issue logged with BESCOM',
          updatedBy: 'Ward Officer'
        }
      ],
      commentsList: [
        {
          id: 'c5',
          author: 'Priya Sharma',
          content: 'This area is very dark at night. Please fix urgently.',
          date: '2024-01-10',
          upvotes: 8
        },
        {
          id: 'c6',
          author: 'Security Guard',
          content: 'We\'ve had to increase patrols due to poor visibility',
          date: '2024-01-11',
          upvotes: 6
        }
      ]
    },
    {
      id: '4',
      title: 'Water Leakage',
      description: 'Continuous water leak from main pipe causing water wastage and road damage.',
      category: 'Water Supply',
      location: '7th Block, Koramangala',
      status: 'in-progress',
      reportedBy: 'Anita Singh',
      reportedAt: '2024-01-07',
      upvotes: 23,
      comments: 8,
      priority: 'high',
      estimatedResolution: '2024-01-16',
      assignedDepartment: 'BWSSB Water Supply',
      contactInfo: {
        phone: '+91 80 4444 5555',
        email: 'leakage@bwssb.gov.in'
      },
      imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400',
      timeline: [
        {
          id: 't8',
          date: '2024-01-07',
          status: 'Reported',
          description: 'Water leakage from main pipeline reported',
          updatedBy: 'Anita Singh'
        },
        {
          id: 't9',
          date: '2024-01-08',
          status: 'Inspection Scheduled',
          description: 'Technical team assigned for site inspection',
          updatedBy: 'BWSSB Supervisor'
        },
        {
          id: 't10',
          date: '2024-01-10',
          status: 'In Progress',
          description: 'Excavation work started, parts ordered',
          updatedBy: 'Repair Team Lead'
        }
      ],
      commentsList: [
        {
          id: 'c7',
          author: 'Local Resident',
          content: 'Water pressure has reduced in our building due to this leak',
          date: '2024-01-08',
          upvotes: 12
        }
      ]
    },
    {
      id: '5',
      title: 'Illegal Parking',
      description: 'Vehicles blocking footpath and causing inconvenience to pedestrians.',
      category: 'Traffic',
      location: '8th Block, Koramangala',
      status: 'resolved',
      reportedBy: 'Kumar M',
      reportedAt: '2024-01-06',
      upvotes: 7,
      comments: 2,
      priority: 'medium',
      assignedDepartment: 'Traffic Police',
      contactInfo: {
        phone: '+91 80 5555 6666',
        email: 'traffic@bangalorepolice.gov.in'
      },
      timeline: [
        {
          id: 't11',
          date: '2024-01-06',
          status: 'Reported',
          description: 'Illegal parking blocking footpath reported',
          updatedBy: 'Kumar M'
        },
        {
          id: 't12',
          date: '2024-01-07',
          status: 'Action Taken',
          description: 'Traffic police issued warnings and fines',
          updatedBy: 'Traffic Constable'
        },
        {
          id: 't13',
          date: '2024-01-08',
          status: 'Resolved',
          description: 'No-parking signs installed, issue resolved',
          updatedBy: 'Ward Officer'
        }
      ],
      commentsList: [
        {
          id: 'c8',
          author: 'Elderly Resident',
          content: 'Thank you for resolving this. Much easier to walk now.',
          date: '2024-01-09',
          upvotes: 5
        }
      ]
    }
  ];

  const pendingVerification: Issue[] = [
    {
      id: '6',
      title: 'Pothole Fixed',
      description: 'Large pothole has been repaired',
      category: 'Roads',
      location: '100th Feet Road, Koramangala',
      status: 'resolved',
      reportedBy: userProfile.name,
      reportedAt: '2024-01-10',
      upvotes: 12,
      comments: 3,
      isOwnReport: true,
      needsVerification: true,
      beforeImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      afterImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400'
    }
  ];

  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [showMap, setShowMap] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [issueDetailOpen, setIssueDetailOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  
  // Multi-step report form state
  const [reportStep, setReportStep] = useState(1);
  const [reportCategory, setReportCategory] = useState('');
  const [customCategoryText, setCustomCategoryText] = useState('');
  const [aiPredictedCategory, setAiPredictedCategory] = useState('');
  const [categoryConfirmed, setCategoryConfirmed] = useState(false);
  const [reportDescription, setReportDescription] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [expectedResolutionDays, setExpectedResolutionDays] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiCategories, setAiCategories] = useState<string[]>([]);
  const [aiConfidence, setAiConfidence] = useState<number>(0);
  const [currentLocation, setCurrentLocation] = useState<{lat: number; lng: number} | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [useCustomDescription, setUseCustomDescription] = useState(false);
  const [cameraError, setCameraError] = useState<string>('');
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  
  // Dynamic data states
  const [myReportsState, setMyReportsState] = useState<Issue[]>(myRecentIssues);
  const [communityIssuesState, setCommunityIssuesState] = useState<Issue[]>(communityIssues);
  
  // Upvote tracking - Set of issue IDs that user has upvoted
  const [upvotedIssues, setUpvotedIssues] = useState<Set<string>>(new Set());
  
  // Comment functionality states
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentingOnIssue, setCommentingOnIssue] = useState<Issue | null>(null);
  
  // Voice recording states
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [audioUrl, setAudioUrl] = useState<string>('');
  
  const notificationsList = [
    {
      id: '1',
      type: 'status_update',
      title: 'Issue Status Updated',
      message: 'Your pothole report has been marked as "In Progress"',
      timestamp: '2024-01-13 10:30 AM',
      read: false,
      issueId: '1'
    },
    {
      id: '2',
      type: 'community_alert',
      title: 'New Issue in Your Area',
      message: 'Water leakage reported in 7th Block, Koramangala',
      timestamp: '2024-01-12 08:15 PM',
      read: false,
      issueId: '4'
    },
    {
      id: '3',
      type: 'verification_request',
      title: 'Verification Required',
      message: 'Please verify if the pothole on Main Road has been fixed',
      timestamp: '2024-01-12 02:20 PM',
      read: true,
      issueId: '6'
    },
    {
      id: '4',
      type: 'system',
      title: 'Weekly Ward Summary',
      message: '15 issues resolved this week in Ward 15',
      timestamp: '2024-01-11 06:00 PM',
      read: true
    },
    {
      id: '5',
      type: 'upvote',
      title: 'Your Report Gained Support',
      message: 'Your garbage collection issue received 5 new upvotes',
      timestamp: '2024-01-10 01:45 PM',
      read: true,
      issueId: '2'
    }
  ];
  
  const unreadNotifications = notificationsList.filter(n => !n.read).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredCommunityIssues = communityIssuesState.filter(issue => {
    const categoryMatch = filterCategory === 'all' || issue.category === filterCategory;
    const statusMatch = filterStatus === 'all' || issue.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const allMyReports = [...myReportsState, ...pendingVerification.filter(issue => !issue.needsVerification)];

  // Real voice recording implementation
  const startRecording = async () => {
    try {
      // Check if we already know permission is denied
      if (micPermission === 'denied') {
        alert('Microphone access is blocked. Please enable it in your browser settings and try again.');
        return;
      }

      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      setMicPermission('granted');
      setIsRecording(true);
      setRecordingTime(0);
      setAudioChunks([]);
      
      // Create MediaRecorder instance
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'
      });
      
      setMediaRecorder(recorder);
      
      // Handle data available event
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };
      
      // Handle recording stop
      recorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        
        // Create audio blob from chunks
        const audioBlob = new Blob(audioChunks, { 
          type: recorder.mimeType || 'audio/webm' 
        });
        
        // Create audio URL for playback
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Send audio to admin portal (simulate)
        await sendAudioToAdmin(audioBlob);
        
        // Transcribe audio
        await transcribeAudio(audioBlob);
      };
      
      // Start recording
      recorder.start(1000); // Collect data every second
      
      // Start timer
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 60) { // Auto stop after 60 seconds
            stopRecording();
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      
    } catch (error: any) {
      // Handle microphone permission errors gracefully without console logging
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setMicPermission('denied');
        // Silently handle permission denied - user will see UI feedback
      } else if (error.name === 'NotFoundError') {
        console.warn('No microphone found on device');
        setMicPermission('denied');
      } else if (error.name === 'NotSupportedError') {
        console.warn('Microphone not supported on this device/browser');
        setMicPermission('denied');
      } else {
        // Only log unexpected errors
        console.error('Unexpected microphone error:', error.name || 'Unknown error');
        setMicPermission('denied');
      }
      
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  };

  // Send audio recording to admin portal
  const sendAudioToAdmin = async (audioBlob: Blob) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('audio', audioBlob, `voice-report-${Date.now()}.webm`);
      formData.append('reportId', `temp-${Date.now()}`);
      formData.append('userId', userProfile.name);
      formData.append('timestamp', new Date().toISOString());
      formData.append('location', currentLocation ? `${currentLocation.lat},${currentLocation.lng}` : userProfile.address);
      
      // Simulate API call to admin portal
      console.log('Sending audio to admin portal:', {
        size: audioBlob.size,
        type: audioBlob.type,
        timestamp: new Date().toISOString(),
        user: userProfile.name
      });
      
      // In a real app, you would send this to your backend:
      // const response = await fetch('/api/admin/voice-reports', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // Simulate successful upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Audio successfully sent to admin portal');
      
    } catch (error) {
      console.error('Failed to send audio to admin:', error);
    }
  };

  // Transcribe audio using Web Speech API or simulate
  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      // Try to use Web Speech API for real-time transcription
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        // Note: For real transcription, you'd need to implement a more complex solution
        // as MediaRecorder and SpeechRecognition don't work directly together
        // This is a simplified approach
        
        // For now, we'll use simulated transcription based on audio duration
        const duration = recordingTime;
        let transcriptionText = '';
        
        if (duration < 5) {
          transcriptionText = "There is an issue that needs attention.";
        } else if (duration < 15) {
          transcriptionText = "There is a civic issue in our area that requires immediate attention from the authorities.";
        } else if (duration < 30) {
          transcriptionText = "There is a significant civic issue in our neighborhood that has been causing problems for residents and needs immediate attention from the municipal authorities.";
        } else {
          transcriptionText = "There is a major civic infrastructure issue in our area that has been causing significant inconvenience to residents and pedestrians. This problem has persisted for some time and requires urgent intervention from the municipal authorities to resolve it properly.";
        }
        
        setVoiceTranscript(transcriptionText);
        setReportDescription(prev => {
          const newDescription = prev + (prev ? ' ' : '') + transcriptionText;
          return newDescription;
        });
        
      } else {
        // Fallback to simulated transcription
        const sampleTranscripts = [
          "There is a large pothole on the main road that needs immediate attention. It's causing traffic issues and is dangerous for vehicles.",
          "The streetlight has been broken for several days. The area becomes very dark at night and it's unsafe for pedestrians.",
          "Garbage has not been collected for the past week. The waste is piling up and creating a health hazard in our neighborhood.",
          "There is a water leak from the main pipeline. Water is being wasted and it's causing damage to the road surface."
        ];
        
        const randomTranscript = sampleTranscripts[Math.floor(Math.random() * sampleTranscripts.length)];
        setVoiceTranscript(randomTranscript);
        setReportDescription(prev => prev + (prev ? ' ' : '') + randomTranscript);
      }
      
    } catch (error) {
      console.error('Transcription error:', error);
      setVoiceTranscript('Voice recording completed. Please review and edit the description as needed.');
    }
  };

  // Image upload simulation
  const handleImageUpload = () => {
    // Simulate image upload with sample images
    const sampleImages = [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300',
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=300',
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=300',
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=300'
    ];
    
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setUploadedImages(prev => [...prev, randomImage]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const resetReportForm = () => {
    setReportStep(1);
    setReportCategory('');
    setCustomCategoryText('');
    setAiPredictedCategory('');
    setCategoryConfirmed(false);
    setReportDescription('');
    setSelectedComplaint('');
    setCustomLocation('');
    setExpectedResolutionDays('');
    setVoiceTranscript('');
    setUploadedImages([]);
    setRecordingTime(0);
    setIsRecording(false);
    setAiSuggestions([]);
    setAiCategories([]);
    setAiConfidence(0);
    setCurrentLocation(null);
    setUseCustomDescription(false);
    setCameraError('');
    setCameraPermission('prompt');
    setAudioChunks([]);
    setMediaRecorder(null);
    // Clean up audio URL to prevent memory leaks
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Location services
  const requestLocationPermission = async () => {
    setLocationLoading(true);
    try {
      // Simulate permission request
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLocationPermission('granted');
      getCurrentLocation();
    } catch (error) {
      setLocationPermission('denied');
    } finally {
      setLocationLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    setLocationLoading(true);
    try {
      // Simulate getting location
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Mock coordinates for Koramangala, Bangalore
      setCurrentLocation({ lat: 12.9352, lng: 77.6245 });
    } catch (error) {
      console.error('Location error:', error);
    } finally {
      setLocationLoading(false);
    }
  };

  // Priority-based image analysis: Filename first, then AI, then manual selection
  const analyzeImageWithAI = async (imageUrl: string, filename?: string) => {
    try {
      // Set loading state
      setAiPredictedCategory('');
      setAiSuggestions([]);
      setAiCategories([]);
      setAiConfidence(0);
      
      // Step 1: Check filename first for category keywords
      const filenameCategory = detectCategoryFromFilename(imageUrl, filename);
      
      if (filenameCategory) {
        // Filename detection successful - high confidence
        setAiPredictedCategory(filenameCategory);
        const suggestions = generateSuggestionsForCategory(filenameCategory);
        setAiSuggestions(suggestions);
        setAiConfidence(95); // High confidence for filename detection
        setAiCategories([filenameCategory, 'Others']);
        
        // Quick advance to confirmation
        setTimeout(() => setReportStep(2), 300);
        
        console.log('Category detected from filename:', {
          filename: filename || imageUrl.substring(imageUrl.lastIndexOf('/') + 1),
          category: filenameCategory,
          suggestions: suggestions.length,
          timestamp: new Date().toISOString()
        });
        return;
      }
      
      // Step 2: Check if filename is generic (requires AI analysis)
      const isGenericFilename = checkIfGenericFilename(imageUrl, filename);
      
      if (isGenericFilename) {
        // Show AI analysis loading state
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Use AI to analyze image content
        const aiDetectedCategory = detectCategoryFromImageContent(imageUrl);
        
        if (aiDetectedCategory && aiDetectedCategory !== 'Others') {
          // AI successfully detected a category
          setAiPredictedCategory(aiDetectedCategory);
          const suggestions = generateSuggestionsForCategory(aiDetectedCategory);
          setAiSuggestions(suggestions);
          setAiConfidence(Math.floor(Math.random() * 20) + 75); // 75-94% confidence for AI
          setAiCategories([aiDetectedCategory, 'Others']);
          
          // Advance to confirmation step
          setTimeout(() => setReportStep(2), 300);
          
          console.log('AI detected category from image content:', {
            imageUrl: imageUrl.substring(0, 50) + '...',
            category: aiDetectedCategory,
            confidence: aiConfidence,
            suggestions: suggestions.length,
            timestamp: new Date().toISOString()
          });
          return;
        }
      }
      
      // Step 3: Both filename and AI detection failed - set to Others
      setAiPredictedCategory('Others');
      setAiSuggestions([]);
      setAiCategories(['Others']);
      setAiConfidence(0);
      
      // Go directly to manual category selection
      setTimeout(() => setReportStep(3), 300);
      
      console.log('Both filename and AI detection failed - manual selection required:', {
        filename: filename || imageUrl.substring(imageUrl.lastIndexOf('/') + 1),
        isGeneric: isGenericFilename,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Image analysis error:', error);
      
      // Fallback to Others on error
      setAiPredictedCategory('Others');
      setAiSuggestions([]);
      setAiCategories(['Others']);
      setAiConfidence(0);
      
      setTimeout(() => setReportStep(3), 300);
    }
  };

  // Check filename for category keywords
  const detectCategoryFromFilename = (imageUrl: string, filename?: string) => {
    // Extract filename from URL or use provided filename
    const imageName = filename || imageUrl.substring(imageUrl.lastIndexOf('/') + 1).toLowerCase();
    const filenameLower = imageName.toLowerCase();
    
    // Category detection from filename keywords
    const categoryKeywords = {
      'Roads': ['road', 'pothole', 'crack', 'pavement', 'asphalt', 'street', 'path', 'highway', 'lane'],
      'Waste Management': ['waste', 'garbage', 'trash', 'litter', 'bin', 'dump', 'refuse', 'rubbish'],
      'Water Supply': ['water', 'leak', 'pipe', 'drain', 'flood', 'wet', 'burst', 'plumbing', 'sewage'],
      'Public Safety': ['light', 'lamp', 'safety', 'electric', 'pole', 'signal', 'broken', 'security'],
      'Traffic': ['traffic', 'sign', 'signal', 'parking', 'vehicle', 'car', 'block', 'congestion'],
      'Electricity': ['electric', 'power', 'cable', 'wire', 'transformer', 'outage', 'blackout'],
      'Sanitation': ['toilet', 'bathroom', 'sewage', 'drainage', 'hygiene', 'cleaning']
    };

    // Check filename against category keywords
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => filenameLower.includes(keyword))) {
        return category;
      }
    }

    return null; // No category detected from filename
  };

  // Check if filename is generic and requires AI analysis
  const checkIfGenericFilename = (imageUrl: string, filename?: string) => {
    const imageName = filename || imageUrl.substring(imageUrl.lastIndexOf('/') + 1).toLowerCase();
    
    const genericPatterns = [
      // Generic folder/app names
      'images', 'downloads', 'whatsapp', 'telegram', 'camera', 'photos', 'gallery',
      'dcim', 'screenshot', 'pic', 'photo', 'snap', 'capture',
      // Generic filename patterns
      'img_', 'image_', 'photo_', 'pic_', 'screenshot_', 'snap_',
      // Default camera patterns
      'dsc_', 'dsc', 'p_', 'cam_', '20', '19', // years in filename
      // Timestamp patterns
      'whatsapp image', 'img-', 'image-', 'photo-',
      // Generic extensions or patterns
      'untitled', 'new', 'temp', 'copy'
    ];

    // Check if filename contains generic patterns
    const filenameLower = imageName.toLowerCase();
    const isGeneric = genericPatterns.some(pattern => 
      filenameLower.includes(pattern) || filenameLower.startsWith(pattern)
    );

    // Also check for pure numeric filenames (like timestamps)
    const isPureNumeric = /^\d+\.(jpg|jpeg|png|gif|webp)$/i.test(imageName);
    
    // Check for default camera naming patterns
    const isDefaultCameraPattern = /^(img|image|photo|pic|dsc)[\d_-]+\.(jpg|jpeg|png|gif|webp)$/i.test(imageName);

    return isGeneric || isPureNumeric || isDefaultCameraPattern;
  };

  // Simulate AI image content analysis
  const detectCategoryFromImageContent = (imageUrl: string) => {
    // Simulate AI analysis with some sample detection logic
    // In a real app, this would send the image to an AI service
    
    const possibleCategories = [
      'Roads', 'Waste Management', 'Water Supply', 'Public Safety', 'Traffic', 'Electricity', 'Sanitation'
    ];
    
    // Simple simulation based on URL patterns or random for demo
    if (imageUrl.includes('pothole') || imageUrl.includes('road') || imageUrl.includes('1578662996442')) {
      return 'Roads';
    } else if (imageUrl.includes('garbage') || imageUrl.includes('waste') || imageUrl.includes('1530587191325')) {
      return 'Waste Management';
    } else if (imageUrl.includes('water') || imageUrl.includes('leak') || imageUrl.includes('1582719471384')) {
      return 'Water Supply';
    } else if (imageUrl.includes('light') || imageUrl.includes('safety') || imageUrl.includes('1542282088')) {
      return 'Public Safety';
    } else if (imageUrl.includes('traffic') || imageUrl.includes('parking') || imageUrl.includes('vehicle')) {
      return 'Traffic';
    } else {
      // Simulate AI not recognizing the issue (60% chance)
      const random = Math.random();
      if (random < 0.6) {
        return 'Others'; // AI couldn't recognize the issue
      } else {
        // AI makes a guess (40% chance)
        return possibleCategories[Math.floor(Math.random() * possibleCategories.length)];
      }
    }
  };

  // Check camera permission status
  const checkCameraPermission = async () => {
    try {
      const permission = await navigator.permissions?.query({ name: 'camera' as PermissionName });
      if (permission) {
        setCameraPermission(permission.state as 'granted' | 'denied' | 'prompt');
        return permission.state;
      }
    } catch (error) {
      // Permission API not supported, will check during camera access
    }
    return 'prompt';
  };

  // Enhanced camera capture with comprehensive error prevention
  const handleCameraCapture = async () => {
    setCameraError('');
    
    // Pre-flight checks to avoid unnecessary errors
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('NOT_SUPPORTED');
      return;
    }

    // Check if we already know permission is denied
    if (cameraPermission === 'denied') {
      setCameraError('PERMISSION_DENIED');
      return;
    }

    try {
      // Check permissions first if supported
      const permissionStatus = await checkCameraPermission();
      if (permissionStatus === 'denied') {
        setCameraError('PERMISSION_DENIED');
        return;
      }

      // Attempt to enumerate devices to see if camera exists
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some(device => device.kind === 'videoinput');
        if (!hasCamera) {
          setCameraError('NO_CAMERA');
          return;
        }
      } catch (enumError) {
        // Continue anyway, enumerateDevices might not work in all browsers
      }

      // Try to get camera access with minimal constraints first
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      setCameraPermission('granted');
      setCameraError(''); // Clear any previous errors
      
      // Create a modal-like overlay for camera capture
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `;
      
      const video = document.createElement('video');
      video.style.cssText = `
        width: 90%;
        max-width: 500px;
        height: auto;
        border-radius: 12px;
        margin-bottom: 20px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      `;
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;
      
      const instructionText = document.createElement('p');
      instructionText.innerHTML = 'Position the issue in frame and tap capture';
      instructionText.style.cssText = `
        color: white;
        text-align: center;
        margin-bottom: 20px;
        font-size: 16px;
      `;
      
      const captureButton = document.createElement('button');
      captureButton.innerHTML = '📸 Capture Photo';
      captureButton.style.cssText = `
        background: #3b82f6;
        color: white;
        padding: 15px 30px;
        border: none;
        border-radius: 10px;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        margin-bottom: 15px;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        transition: all 0.2s;
      `;
      
      const cancelButton = document.createElement('button');
      cancelButton.innerHTML = '❌ Cancel';
      cancelButton.style.cssText = `
        background: #6b7280;
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      `;
      
      // Add hover effects
      captureButton.onmouseenter = () => {
        captureButton.style.background = '#2563eb';
        captureButton.style.transform = 'scale(1.05)';
      };
      captureButton.onmouseleave = () => {
        captureButton.style.background = '#3b82f6';
        captureButton.style.transform = 'scale(1)';
      };
      
      overlay.appendChild(instructionText);
      overlay.appendChild(video);
      overlay.appendChild(captureButton);
      overlay.appendChild(cancelButton);
      document.body.appendChild(overlay);
      
      const cleanupCamera = () => {
        stream.getTracks().forEach(track => track.stop());
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      };
      
      captureButton.onclick = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
          ctx?.drawImage(video, 0, 0);
          
          const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setUploadedImages([imageDataUrl]);
          
          cleanupCamera();
          
          // Analyze image with filename priority
          analyzeImageWithAI(imageDataUrl, 'camera-capture.jpg');
        } catch (captureError) {
          console.error('Image capture error:', captureError);
          cleanupCamera();
          setCameraError('GENERAL_ERROR');
        }
      };
      
      cancelButton.onclick = cleanupCamera;
      
      // Auto-cleanup on escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          cleanupCamera();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
      
    } catch (error: any) {
      // Suppress console error logging and handle gracefully
      
      // Handle different types of camera errors without logging
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setCameraPermission('denied');
        setCameraError('PERMISSION_DENIED');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setCameraError('NO_CAMERA');
      } else if (error.name === 'NotSupportedError' || error.name === 'NotReadableError') {
        setCameraError('NOT_SUPPORTED');
      } else if (error.name === 'OverconstrainedError') {
        // Try again with basic constraints
        try {
          const basicStream = await navigator.mediaDevices.getUserMedia({ video: true });
          basicStream.getTracks().forEach(track => track.stop());
          setCameraPermission('granted');
          // Retry with basic settings
          handleCameraCapture();
          return;
        } catch (basicError) {
          setCameraError('GENERAL_ERROR');
        }
      } else {
        setCameraError('GENERAL_ERROR');
      }
    }
  };

  // Fallback to sample image when camera fails
  const useSampleImage = () => {
    const sampleImages = [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400', 
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=400',
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400'
    ];
    
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setUploadedImages([randomImage]);
    setCameraError('');
    
    // Analyze image with sample filename
    analyzeImageWithAI(randomImage, 'sample-image.jpg');
  };

  // Real file upload implementation
  const handleGalleryUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = false;
    
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageDataUrl = e.target?.result as string;
          setUploadedImages([imageDataUrl]);
          
          // Analyze image with actual filename
          analyzeImageWithAI(imageDataUrl, file.name);
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };

  // Generate category-specific suggestions when category changes
  const generateSuggestionsForCategory = (category: string) => {
    const categorySpecificSuggestions = {
      'Roads': [
        'Large pothole causing vehicle damage and safety concerns',
        'Road surface deterioration requiring immediate repair',
        'Dangerous road condition affecting traffic flow and safety',
        'Cracked pavement creating hazards for vehicles and pedestrians',
        'Road damage from heavy traffic requiring maintenance'
      ],
      'Waste Management': [
        'Accumulated garbage creating health hazard and odor issues',
        'Improper waste disposal causing sanitation problems',
        'Overflowing waste bins requiring immediate collection',
        'Scattered litter affecting neighborhood cleanliness',
        'Waste management issue requiring urgent attention'
      ],
      'Water Supply': [
        'Water leakage causing wastage and infrastructure damage',
        'Burst pipeline requiring urgent repair to prevent flooding',
        'Continuous water flow creating road and property damage',
        'Water supply disruption affecting residents',
        'Drainage issue causing waterlogging and health concerns'
      ],
      'Public Safety': [
        'Non-functional street light creating safety concerns',
        'Poor lighting affecting pedestrian safety during night hours',
        'Electrical infrastructure requiring urgent maintenance',
        'Safety hazard requiring immediate attention from authorities',
        'Public safety issue affecting community security'
      ],
      'Traffic': [
        'Traffic signal malfunction causing confusion and delays',
        'Damaged traffic signs affecting road safety',
        'Illegal parking blocking traffic flow and pedestrian access',
        'Traffic management issue requiring intervention',
        'Road markings faded or missing, creating safety hazards'
      ],
      'Electricity': [
        'Power outage affecting multiple households',
        'Electrical pole damage requiring urgent repair',
        'Exposed electrical wiring creating safety hazards',
        'Transformer malfunction causing power fluctuations',
        'Street lighting electrical issues affecting safety'
      ],
      'Infrastructure': [
        'Public infrastructure requiring maintenance and repair',
        'Facility damage affecting community services',
        'Structural issues requiring professional assessment',
        'Infrastructure deterioration impacting daily life',
        'Municipal facility requiring urgent attention'
      ]
    };

    // Handle custom categories or fallback
    const suggestions = categorySpecificSuggestions[category as keyof typeof categorySpecificSuggestions] || [
      `${category} issue requiring attention from authorities`,
      `Public facility or service issue affecting community`,
      `Infrastructure problem requiring municipal intervention`,
      `Civic issue impacting neighborhood quality of life`,
      `Service disruption requiring immediate attention`
    ];

    return suggestions.slice(0, 3);
  };

  const proceedToNextStep = () => {
    setReportStep(prev => prev + 1);
  };

  const goBackStep = () => {
    setReportStep(prev => Math.max(1, prev - 1));
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const Header = () => (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-green-500">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-white hover:bg-white/20 p-2"
        onClick={() => setUserProfileOpen(true)}
      >
        <User className="w-6 h-6" />
      </Button>
      <h1 className="text-white font-semibold">CitizenReport</h1>
      <div className="relative">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/20 p-2"
          onClick={() => setNotificationsOpen(true)}
        >
          <Bell className="w-6 h-6" />
        </Button>
        {unreadNotifications > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
            {unreadNotifications}
          </div>
        )}
      </div>
    </div>
  );

  const IssueDetailDialog = () => {
    if (!selectedIssue) return null;

    return (
      <Dialog open={issueDetailOpen} onOpenChange={setIssueDetailOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedIssue.title}
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white ${getStatusColor(selectedIssue.status)}`}>
                {getStatusIcon(selectedIssue.status)}
                <span className="capitalize">{selectedIssue.status.replace('-', ' ')}</span>
              </div>
            </DialogTitle>
            <DialogDescription>
              View detailed information about this civic issue including progress timeline and community engagement.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Issue Overview */}
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">{selectedIssue.category}</Badge>
                {selectedIssue.priority && (
                  <Badge className={getPriorityColor(selectedIssue.priority)}>
                    {selectedIssue.priority.toUpperCase()} Priority
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-700">{selectedIssue.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{selectedIssue.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Reported: {selectedIssue.reportedAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>By: {selectedIssue.reportedBy}</span>
                </div>
                {selectedIssue.estimatedResolution && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>ETA: {selectedIssue.estimatedResolution}</span>
                  </div>
                )}
              </div>

              {selectedIssue.assignedDepartment && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Assigned Department</h4>
                  <p className="text-sm text-gray-700">{selectedIssue.assignedDepartment}</p>
                  {selectedIssue.contactInfo && (
                    <div className="flex gap-4 mt-2 text-sm">
                      {selectedIssue.contactInfo.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{selectedIssue.contactInfo.phone}</span>
                        </div>
                      )}
                      {selectedIssue.contactInfo.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{selectedIssue.contactInfo.email}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {selectedIssue.imageUrl && (
                <div>
                  <h4 className="font-medium mb-2">Issue Photo</h4>
                  <img 
                    src={selectedIssue.imageUrl} 
                    alt="Issue" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Timeline */}
            {selectedIssue.timeline && selectedIssue.timeline.length > 0 && (
              <div>
                <h4 className="font-medium mb-4">Progress Timeline</h4>
                <div className="space-y-4">
                  {selectedIssue.timeline.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          index === 0 ? 'bg-blue-500' : 
                          index === selectedIssue.timeline!.length - 1 ? 'bg-green-500' : 
                          'bg-yellow-500'
                        }`} />
                        {index < selectedIssue.timeline!.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-300 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium">{event.status}</h5>
                          <span className="text-xs text-gray-500">{event.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{event.description}</p>
                        {event.updatedBy && (
                          <p className="text-xs text-gray-500 mt-1">Updated by: {event.updatedBy}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            {selectedIssue.commentsList && selectedIssue.commentsList.length > 0 && (
              <div>
                <h4 className="font-medium mb-4">Community Comments ({selectedIssue.commentsList.length})</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {selectedIssue.commentsList.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{comment.date}</span>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3 text-blue-500" />
                            <span className="text-xs">{comment.upvotes}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engagement Stats */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{selectedIssue.upvotes} upvotes</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{selectedIssue.comments} comments</span>
                </div>
              </div>
              {!selectedIssue.isOwnReport && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={upvotedIssues.has(selectedIssue.id) ? 'bg-blue-50 border-blue-300 text-blue-600' : ''}
                    onClick={() => handleUpvote(selectedIssue.id)}
                    disabled={upvotedIssues.has(selectedIssue.id)}
                  >
                    <ThumbsUp className={`w-4 h-4 mr-1 ${upvotedIssues.has(selectedIssue.id) ? 'fill-current' : ''}`} />
                    {upvotedIssues.has(selectedIssue.id) ? 'Upvoted' : 'Upvote'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleComment(selectedIssue)}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Comment
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const UserProfileDialog = () => (
    <Dialog open={userProfileOpen} onOpenChange={setUserProfileOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            User Profile
          </DialogTitle>
          <DialogDescription>
            View and edit your profile information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Full Name</label>
              {editingProfile ? (
                <Input 
                  key="profile-name-input"
                  type="text" 
                  value={userProfile.name}
                  onChange={(e) => {
                    e.stopPropagation();
                    const newValue = e.target.value;
                    setUserProfile(prev => ({...prev, name: newValue}));
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    // Allow normal keyboard navigation
                  }}
                  placeholder="Enter your full name"
                  autoComplete="off"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userProfile.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Phone Number</label>
              {editingProfile ? (
                <Input 
                  key="profile-phone-input"
                  type="tel" 
                  value={userProfile.phone}
                  onChange={(e) => {
                    e.stopPropagation();
                    const newValue = e.target.value;
                    setUserProfile(prev => ({...prev, phone: newValue}));
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                  }}
                  placeholder="Enter your phone number"
                  autoComplete="off"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userProfile.phone}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Email Address</label>
              {editingProfile ? (
                <Input 
                  key="profile-email-input"
                  type="email" 
                  value={userProfile.email}
                  onChange={(e) => {
                    e.stopPropagation();
                    const newValue = e.target.value;
                    setUserProfile(prev => ({...prev, email: newValue}));
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                  }}
                  placeholder="Enter your email address"
                  autoComplete="off"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userProfile.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Address</label>
              {editingProfile ? (
                <Textarea 
                  key="profile-address-input"
                  value={userProfile.address}
                  onChange={(e) => {
                    e.stopPropagation();
                    const newValue = e.target.value;
                    setUserProfile(prev => ({...prev, address: newValue}));
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                  }}
                  className="min-h-[60px]"
                  placeholder="Enter your address"
                  autoComplete="off"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userProfile.address}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Ward</label>
              <p className="p-2 bg-blue-50 border border-blue-200 rounded-md text-blue-700">
                {userProfile.ward}
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            {editingProfile ? (
              <>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setEditingProfile(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => setEditingProfile(false)}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setEditingProfile(true)}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => {
                    setUserProfileOpen(false);
                    // Handle logout
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const NotificationsDialog = () => (
    <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </DialogTitle>
          <DialogDescription>
            Stay updated with your reports and community alerts
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          {notificationsList.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                notification.read 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}
              onClick={() => {
                if (notification.issueId) {
                  const issue = [...myReportsState, ...communityIssuesState, ...pendingVerification]
                    .find(i => i.id === notification.issueId);
                  if (issue) {
                    setSelectedIssue(issue);
                    setNotificationsOpen(false);
                    setIssueDetailOpen(true);
                  }
                }
              }}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  {notification.type === 'status_update' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {notification.type === 'community_alert' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                  {notification.type === 'verification_request' && <Eye className="w-4 h-4 text-blue-500" />}
                  {notification.type === 'system' && <Bell className="w-4 h-4 text-gray-500" />}
                  {notification.type === 'upvote' && <ThumbsUp className="w-4 h-4 text-purple-500" />}
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
              <p className="text-xs text-gray-500">{notification.timestamp}</p>
            </div>
          ))}
          
          {notificationsList.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No notifications yet</p>
              <p className="text-sm">You'll receive updates about your reports here</p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setNotificationsOpen(false)}
          >
            Mark All as Read
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const handleUpvote = (issueId: string) => {
    // Check if user has already upvoted this issue
    if (upvotedIssues.has(issueId)) {
      return; // Don't allow multiple upvotes
    }

    // Add to upvoted issues set
    setUpvotedIssues(prev => new Set(prev).add(issueId));
    
    // Update the issue's upvote count
    setCommunityIssuesState(prev => 
      prev.map(issue => 
        issue.id === issueId 
          ? { ...issue, upvotes: issue.upvotes + 1 }
          : issue
      )
    );
  };

  const handleComment = (issue: Issue) => {
    setCommentingOnIssue(issue);
    setCommentDialogOpen(true);
    setNewComment('');
  };

  const submitComment = () => {
    if (!newComment.trim() || !commentingOnIssue) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: userProfile.name,
      content: newComment.trim(),
      date: new Date().toISOString().split('T')[0],
      upvotes: 0
    };

    // Update the issue with the new comment
    const updateIssueComments = (issues: Issue[]) => 
      issues.map(issue => 
        issue.id === commentingOnIssue.id 
          ? { 
              ...issue, 
              comments: issue.comments + 1,
              commentsList: [...(issue.commentsList || []), comment]
            }
          : issue
      );

    // Update in community issues
    setCommunityIssuesState(updateIssueComments);
    
    // Update in my reports if it's my issue
    setMyReportsState(updateIssueComments);

    // Update selected issue if it's the same one
    if (commentingOnIssue.id === selectedIssue?.id) {
      setSelectedIssue(prev => prev ? {
        ...prev,
        comments: prev.comments + 1,
        commentsList: [...(prev.commentsList || []), comment]
      } : null);
    }

    // Close dialog and reset
    setCommentDialogOpen(false);
    setNewComment('');
    setCommentingOnIssue(null);
  };

  const IssueCard = ({ issue, showActions = true }: { issue: Issue; showActions?: boolean }) => (
    <Card className="mb-4 shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{issue.title}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{issue.description}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <MapPin className="w-3 h-3" />
              <span>{issue.location}</span>
              <Calendar className="w-3 h-3 ml-2" />
              <span>{issue.reportedAt}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="text-xs">
              {issue.category}
            </Badge>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white ${getStatusColor(issue.status)}`}>
              {getStatusIcon(issue.status)}
              <span className="capitalize">{issue.status.replace('-', ' ')}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            {showActions && !issue.isOwnReport && (
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center gap-1 ${
                    upvotedIssues.has(issue.id) 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => handleUpvote(issue.id)}
                  disabled={upvotedIssues.has(issue.id)}
                >
                  <ThumbsUp className={`w-4 h-4 ${upvotedIssues.has(issue.id) ? 'fill-current' : ''}`} />
                  {issue.upvotes}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-gray-600 hover:text-green-600 hover:bg-green-50"
                  onClick={() => handleComment(issue)}
                >
                  <MessageCircle className="w-4 h-4" />
                  {issue.comments}
                </Button>
              </div>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setSelectedIssue(issue);
              setIssueDetailOpen(true);
            }}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
          >
            <Eye className="w-4 h-4" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const HomeScreen = () => (
    <div className="p-4 space-y-4">
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 shadow-md">
        <CardContent className="p-4">
          <h2 className="text-lg mb-2">Hello {userProfile.name}! 👋</h2>
          <div className="text-sm text-gray-600">
            <p>{userProfile.ward} • {userProfile.address}</p>
          </div>
        </CardContent>
      </Card>

      <Button 
        className="w-full h-16 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 rounded-xl shadow-lg"
        onClick={() => setReportDialogOpen(true)}
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6" />
          <span className="text-lg">Report an Issue</span>
        </div>
      </Button>

      {/* Multi-Step Report Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={(open) => {
        setReportDialogOpen(open);
        if (!open) resetReportForm();
      }}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Report New Issue
              <Badge variant="outline">Step {reportStep} of 6</Badge>
            </DialogTitle>
            <DialogDescription>
              Follow the guided steps to report a civic issue with AI assistance for categorization and description.
            </DialogDescription>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(reportStep / 6) * 100}%` }}
              ></div>
            </div>
          </DialogHeader>

          {/* Step 1: Image Upload */}
          {reportStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <Camera className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-lg mb-2">Take or Upload Photo</h3>
                <p className="text-gray-600 text-sm">Please capture or upload an image of the issue to help us better understand and categorize it.</p>
              </div>

              {uploadedImages.length > 0 ? (
                <div className="space-y-4">
                  {/* Always show the uploaded image prominently */}
                  <div className="relative bg-gray-50 rounded-lg p-3 border-2 border-dashed border-gray-200">
                    <div className="text-center mb-3">
                      <div className="inline-flex items-center gap-2 text-gray-600">
                        <Camera className="w-4 h-4" />
                        <span className="text-sm font-medium">Uploaded Image</span>
                      </div>
                    </div>
                    <div className="relative">
                      <img 
                        src={uploadedImages[0]} 
                        alt="Uploaded civic issue" 
                        className="w-full h-48 object-cover rounded-lg border shadow-sm"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-8 h-8 p-0 rounded-full shadow-lg"
                        onClick={() => {
                          setUploadedImages([]);
                          setCameraError('');
                          setAiPredictedCategory('');
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* AI Analysis Results */}
                  {aiPredictedCategory && aiPredictedCategory !== 'Others' ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-center gap-2 text-green-600 mb-3">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-medium">AI Category Detected!</span>
                      </div>
                      <div className="text-center mb-3">
                        <div className="inline-flex items-center gap-2 bg-white rounded-lg px-3 py-2 border">
                          <span className="text-sm font-medium">AI Predicted Category:</span>
                          <Badge className="bg-blue-500">{aiPredictedCategory}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-green-700 text-center">
                        AI has analyzed the image and identified this as a <strong>{aiPredictedCategory}</strong> issue. 
                        We'll provide relevant suggestions in the next step.
                      </p>
                    </div>
                  ) : aiPredictedCategory === 'Others' ? (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center justify-center gap-2 text-orange-600 mb-3">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-medium">AI Suggests: Others</span>
                      </div>
                      <p className="text-sm text-orange-700 text-center">
                        AI could not identify a specific category for this issue. 
                        Please manually select the appropriate category.
                      </p>
                    </div>
                  ) : !aiPredictedCategory ? (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-purple-600 mb-3">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span className="font-medium">AI Analyzing Image...</span>
                      </div>
                      <p className="text-sm text-purple-700">
                        🤖 AI is examining the image to identify the civic issue type...
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-32 flex flex-col items-center gap-3 border-2 border-dashed hover:border-blue-400 hover:bg-blue-50"
                      onClick={handleCameraCapture}
                    >
                      <Camera className="w-8 h-8 text-blue-500" />
                      <span>Open Camera</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-32 flex flex-col items-center gap-3 border-2 border-dashed hover:border-green-400 hover:bg-green-50"
                      onClick={handleGalleryUpload}
                    >
                      <Image className="w-8 h-8 text-green-500" />
                      <span>Choose from Gallery</span>
                    </Button>
                  </div>

                  {/* Camera Error Messages */}
                  {cameraError && (
                    <div className="space-y-3">
                      {cameraError === 'PERMISSION_DENIED' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-red-600 mb-2">
                            <AlertCircle className="w-5 h-5" />
                            <span className="font-medium">Camera Access Blocked</span>
                          </div>
                          <p className="text-sm text-red-700 mb-3">
                            Camera access is currently blocked. You have a few options:
                          </p>
                          <div className="space-y-3">
                            <div className="text-xs text-red-600 bg-red-100 p-2 rounded">
                              <p><strong>💡 To enable camera:</strong></p>
                              <p>• Look for a 🎥 or 🔒 icon in your browser's address bar</p>
                              <p>• Click it and select "Always allow camera access"</p>
                              <p>• Refresh the page and try again</p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                                onClick={() => {
                                  setCameraError('');
                                  handleCameraCapture();
                                }}
                              >
                                <RefreshCw className="w-4 h-4 mr-1" />
                                Try Camera Again
                              </Button>
                              <Button 
                                size="sm" 
                                className="flex-1 bg-blue-500 hover:bg-blue-600"
                                onClick={useSampleImage}
                              >
                                <Image className="w-4 h-4 mr-1" />
                                Use Demo Image
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {cameraError === 'NO_CAMERA' && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-orange-600 mb-2">
                            <AlertCircle className="w-5 h-5" />
                            <span className="font-medium">No Camera Available</span>
                          </div>
                          <p className="text-sm text-orange-700 mb-3">
                            No camera was detected on your device. You can still report issues using:
                          </p>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={handleGalleryUpload}
                            >
                              <Image className="w-4 h-4 mr-1" />
                              Gallery Upload
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1 bg-blue-500 hover:bg-blue-600"
                              onClick={useSampleImage}
                            >
                              <Sparkles className="w-4 h-4 mr-1" />
                              Demo Image
                            </Button>
                          </div>
                        </div>
                      )}

                      {cameraError === 'NOT_SUPPORTED' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-yellow-600 mb-2">
                            <AlertCircle className="w-5 h-5" />
                            <span className="font-medium">Camera Not Supported</span>
                          </div>
                          <p className="text-sm text-yellow-700 mb-3">
                            Your browser or device doesn't support camera access. Alternative options:
                          </p>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={handleGalleryUpload}
                            >
                              <Image className="w-4 h-4 mr-1" />
                              Upload from Files
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1 bg-blue-500 hover:bg-blue-600"
                              onClick={useSampleImage}
                            >
                              <Sparkles className="w-4 h-4 mr-1" />
                              Demo Image
                            </Button>
                          </div>
                        </div>
                      )}

                      {cameraError === 'GENERAL_ERROR' && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <AlertCircle className="w-5 h-5" />
                            <span className="font-medium">Camera Temporarily Unavailable</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">
                            The camera might be in use by another app. Try these alternatives:
                          </p>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={handleGalleryUpload}
                            >
                              <Image className="w-4 h-4 mr-1" />
                              Choose File
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1 bg-blue-500 hover:bg-blue-600"
                              onClick={useSampleImage}
                            >
                              <Sparkles className="w-4 h-4 mr-1" />
                              Demo Image
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="text-center text-sm text-gray-500">
                      <p>Photos help us process your report faster:</p>
                      <ul className="mt-2 space-y-1">
                        <li>• Clear view of the issue</li>
                        <li>• Good lighting conditions</li>
                        <li>• Focus on the main problem</li>
                        <li>• Include surrounding context</li>
                      </ul>
                    </div>
                    
                    <div className="border-t pt-4">
                      <p className="text-center text-sm text-gray-600 mb-3">Quick Demo:</p>
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-auto p-3 flex flex-col gap-1"
                          onClick={() => {
                            // Use a sample image for Roads category
                            const roadImage = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400';
                            setUploadedImages([roadImage]);
                            setCameraError('');
                            analyzeImageWithAI(roadImage, 'pothole_main_road.jpg');
                          }}
                        >
                          <Sparkles className="w-4 h-4 text-blue-500" />
                          <span className="text-xs">Roads Issue</span>
                          <span className="text-xs text-gray-500">AI Detects</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-auto p-3 flex flex-col gap-1"
                          onClick={() => {
                            // Use sample image for Waste Management
                            const wasteImage = 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400';
                            setUploadedImages([wasteImage]);
                            setCameraError('');
                            analyzeImageWithAI(wasteImage, 'WhatsApp Image 2024.jpg');
                          }}
                        >
                          <RefreshCw className="w-4 h-4 text-green-500" />
                          <span className="text-xs">Waste Issue</span>
                          <span className="text-xs text-gray-500">AI Detects</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-auto p-3 flex flex-col gap-1"
                          onClick={() => {
                            // Use image AI can't recognize
                            const genericImage = 'https://images.unsplash.com/photo-1502810365585-56ffa361fdde?w=400';
                            setUploadedImages([genericImage]);
                            setCameraError('');
                            analyzeImageWithAI(genericImage, 'IMG_001.jpg');
                          }}
                        >
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                          <span className="text-xs">Unknown Issue</span>
                          <span className="text-xs text-gray-500">Manual Select</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Category Confirmation */}
          {reportStep === 2 && (
            <div className="space-y-6">
              {/* Continue displaying the uploaded image */}
              {uploadedImages.length > 0 && (
                <div className="relative bg-gray-50 rounded-lg p-3 border-2 border-dashed border-gray-200">
                  <div className="text-center mb-3">
                    <div className="inline-flex items-center gap-2 text-gray-600">
                      <Camera className="w-4 h-4" />
                      <span className="text-sm font-medium">Your Uploaded Image</span>
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src={uploadedImages[0]} 
                      alt="Uploaded civic issue" 
                      className="w-full h-48 object-cover rounded-lg border shadow-sm"
                    />
                  </div>
                </div>
              )}

              <div className="text-center">
                <Sparkles className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                <h3 className="text-lg mb-2">Confirm Category</h3>
                <p className="text-gray-600 text-sm">AI detected this category. Is it correct?</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">AI Category Prediction</h4>
                    <p className="text-sm text-gray-600">Based on image analysis</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    High Confidence
                  </Badge>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                  <div className="text-center">
                    <p className="font-medium text-lg mb-2">{aiPredictedCategory}</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Issue recognized by AI analysis</span>
                    </div>
                  </div>
                </div>
                
                {aiSuggestions.length > 0 && (
                  <div className="mt-3 bg-white rounded-lg p-3 border">
                    <p className="text-sm font-medium mb-2 text-center text-gray-700">
                      Preview: Category-specific suggestions ready
                    </p>
                    <div className="text-xs text-gray-500 space-y-1">
                      {aiSuggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                          <span className="truncate">{suggestion.substring(0, 50)}...</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full h-12 bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    setReportCategory(aiPredictedCategory);
                    setCategoryConfirmed(true);
                    // Ensure we have fresh category-specific suggestions
                    const freshSuggestions = generateSuggestionsForCategory(aiPredictedCategory);
                    setAiSuggestions(freshSuggestions);
                    proceedToNextStep();
                  }}
                >
                  <Check className="w-5 h-5 mr-2" />
                  Yes, this is correct
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full h-12"
                  onClick={() => proceedToNextStep()}
                >
                  <X className="w-5 h-5 mr-2" />
                  No, let me choose different category
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Category Selection (if AI was wrong or unable to detect) */}
          {reportStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                {aiPredictedCategory === 'Others' ? (
                  <>
                    <AlertCircle className="w-16 h-16 mx-auto text-orange-500 mb-4" />
                    <h3 className="text-lg mb-2">AI Suggests: Others</h3>
                    <p className="text-gray-600 text-sm">AI could not identify a specific category. Please select manually.</p>
                  </>
                ) : (
                  <>
                    <Filter className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                    <h3 className="text-lg mb-2">Select Correct Category</h3>
                    <p className="text-gray-600 text-sm">AI prediction was incorrect. Choose the right category.</p>
                  </>
                )}
              </div>

              <div className="space-y-3">
                {/* Show all categories when detection failed, or AI suggested categories */}
                {aiPredictedCategory === 'Others' ? (
                  // Show all available categories
                  ['Roads', 'Waste Management', 'Water Supply', 'Public Safety', 'Traffic', 'Electricity', 'Sanitation', 'Others'].map((category) => (
                    <Button
                      key={category}
                      variant={reportCategory === category ? "default" : "outline"}
                      className="w-full h-12 justify-start text-left"
                      onClick={() => {
                        setReportCategory(category);
                        if (category !== 'Others') {
                          setCustomCategoryText(''); // Clear custom text when selecting predefined category
                          // Generate suggestions for manually selected category
                          const newSuggestions = generateSuggestionsForCategory(category);
                          setAiSuggestions(newSuggestions);
                        } else {
                          setAiSuggestions([]); // Clear suggestions for Others
                        }
                      }}
                    >
                      {category}
                      {category === 'Roads' && <span className="ml-2 text-xs text-gray-500">(Potholes, Cracks, Surface damage)</span>}
                      {category === 'Waste Management' && <span className="ml-2 text-xs text-gray-500">(Garbage, Collection, Bins)</span>}
                      {category === 'Water Supply' && <span className="ml-2 text-xs text-gray-500">(Leaks, Drainage, Supply issues)</span>}
                      {category === 'Public Safety' && <span className="ml-2 text-xs text-gray-500">(Lighting, Security, Hazards)</span>}
                      {category === 'Traffic' && <span className="ml-2 text-xs text-gray-500">(Signals, Signs, Parking)</span>}
                    </Button>
                  ))
                ) : (
                  // AI provided suggested categories
                  aiCategories.map((category) => (
                    <Button
                      key={category}
                      variant={reportCategory === category ? "default" : "outline"}
                      className="w-full h-12 justify-start text-left"
                      onClick={() => {
                        setReportCategory(category);
                        if (category !== 'Others') {
                          setCustomCategoryText(''); // Clear custom text when selecting predefined category
                          // Update suggestions for the selected category
                          const newSuggestions = generateSuggestionsForCategory(category);
                          setAiSuggestions(newSuggestions);
                        } else {
                          setAiSuggestions([]); // Clear suggestions for Others
                        }
                      }}
                    >
                      {category}
                    </Button>
                  ))
                )}
              </div>

              {reportCategory === 'Others' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Custom Category</label>
                  <Input
                    key="custom-category-input"
                    placeholder="Enter your custom category"
                    value={customCategoryText}
                    onChange={(e) => {
                      e.stopPropagation();
                      setCustomCategoryText(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }}
                    onFocus={(e) => {
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    autoComplete="off"
                    autoFocus
                  />
                </div>
              )}

              <Button
                className="w-full"
                disabled={!reportCategory || (reportCategory === 'Others' && !customCategoryText.trim())}
                onClick={() => {
                  // If custom category, use the custom text as the final category and generate suggestions
                  if (reportCategory === 'Others' && customCategoryText.trim()) {
                    const finalCategory = customCategoryText.trim();
                    setReportCategory(finalCategory);
                    // Generate suggestions for the custom category
                    const customSuggestions = generateSuggestionsForCategory(finalCategory);
                    setAiSuggestions(customSuggestions);
                  }
                  setCategoryConfirmed(true);
                  // Skip directly to step 4 (description)
                  setReportStep(4);
                }}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 4: Description Selection */}
          {reportStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h3 className="text-lg mb-2">Describe the Issue</h3>
                <p className="text-gray-600 text-sm">Choose a description or create your own.</p>
              </div>

              {aiSuggestions.length > 0 && !useCustomDescription && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      Suggested Descriptions
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {reportCategory || aiPredictedCategory} Category
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-md p-2">
                    💡 These descriptions are specifically tailored for <strong>{reportCategory || aiPredictedCategory}</strong> issues
                  </p>
                  {aiSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant={selectedComplaint === suggestion ? "default" : "outline"}
                      className="w-full h-auto p-4 text-left justify-start text-sm"
                      onClick={() => {
                        setSelectedComplaint(suggestion);
                        setReportDescription(suggestion);
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setUseCustomDescription(true)}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Write my own description
                  </Button>
                </div>
              )}

              {(useCustomDescription || aiSuggestions.length === 0) && (
                <div className="space-y-4">
                  <div className="flex gap-2 mb-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={isRecording ? stopRecording : startRecording}
                      className={isRecording ? "bg-red-50 border-red-200 text-red-600" : ""}
                      disabled={micPermission === 'denied'}
                    >
                      {isRecording ? (
                        <>
                          <MicOff className="w-4 h-4 mr-1" />
                          Stop ({formatTime(recordingTime)})
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-1" />
                          Voice Input
                        </>
                      )}
                    </Button>
                  </div>

                  {micPermission === 'denied' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
                      <div className="flex items-center gap-2 text-orange-600 mb-2">
                        <Mic className="w-4 h-4" />
                        <span className="text-sm font-medium">Microphone Access Blocked</span>
                      </div>
                      <p className="text-sm text-orange-700">
                        Please allow microphone access in your browser settings to use voice input.
                      </p>
                    </div>
                  )}

                  {isRecording && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3">
                      <div className="flex items-center gap-2 text-red-600">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Recording... {formatTime(recordingTime)}</span>
                      </div>
                      <p className="text-xs text-red-600 mt-1">Speak clearly. Recording will automatically send to admin portal.</p>
                    </div>
                  )}

                  {voiceTranscript && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-green-600">
                          <Mic className="w-4 h-4" />
                          <span className="text-sm font-medium">Voice Transcription:</span>
                        </div>
                        {audioUrl && (
                          <audio controls className="h-8">
                            <source src={audioUrl} type="audio/webm" />
                            Your browser does not support audio playback.
                          </audio>
                        )}
                      </div>
                      <p className="text-sm text-green-700">{voiceTranscript}</p>
                      <p className="text-xs text-green-600 mt-1">✓ Audio sent to admin portal for review</p>
                    </div>
                  )}

                  <Textarea
                    key="description-textarea"
                    placeholder="Describe the issue in detail..."
                    value={reportDescription}
                    onChange={(e) => {
                      e.stopPropagation();
                      setReportDescription(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }}
                    onFocus={(e) => {
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="min-h-[120px]"
                    autoComplete="off"
                  />
                </div>
              )}

              <Button
                className="w-full"
                disabled={!reportDescription.trim()}
                onClick={proceedToNextStep}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 5: Location */}
          {reportStep === 5 && (
            <div className="space-y-6">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto text-red-500 mb-4" />
                <h3 className="text-lg mb-2">Confirm Location</h3>
                <p className="text-gray-600 text-sm">Provide the exact location of the issue.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={currentLocation ? "default" : "outline"}
                    className="h-20 flex flex-col items-center gap-2"
                    onClick={getCurrentLocation}
                    disabled={locationLoading}
                  >
                    {locationLoading ? (
                      <RefreshCw className="w-6 h-6 animate-spin" />
                    ) : (
                      <Navigation className="w-6 h-6" />
                    )}
                    <span className="text-sm">Use GPS</span>
                  </Button>

                  <Button
                    variant={customLocation ? "default" : "outline"}
                    className="h-20 flex flex-col items-center gap-2"
                    onClick={() => document.getElementById('custom-location')?.focus()}
                  >
                    <Edit3 className="w-6 h-6" />
                    <span className="text-sm">Enter Manually</span>
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Manual Location (Optional)</label>
                  <Input
                    key="custom-location-input"
                    id="custom-location"
                    placeholder="Enter specific location or landmark"
                    value={customLocation}
                    onChange={(e) => {
                      e.stopPropagation();
                      setCustomLocation(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }}
                    onFocus={(e) => {
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    autoComplete="off"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Current Location:</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {currentLocation 
                      ? `GPS: ${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`
                      : customLocation || userProfile.address
                    }
                  </p>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={proceedToNextStep}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 6: Expected Resolution Time */}
          {reportStep === 6 && (
            <div className="space-y-6">
              <div className="text-center">
                <Clock className="w-16 h-16 mx-auto text-orange-500 mb-4" />
                <h3 className="text-lg mb-2">Expected Resolution Time</h3>
                <p className="text-gray-600 text-sm">How urgently do you need this issue resolved?</p>
              </div>

              <div className="space-y-3">
                {[
                  { value: '1', label: 'Immediate (1 day)', desc: 'Emergency or safety hazard', color: 'border-red-500 hover:bg-red-50' },
                  { value: '3', label: 'Urgent (3 days)', desc: 'Causing significant inconvenience', color: 'border-orange-500 hover:bg-orange-50' },
                  { value: '7', label: 'Normal (1 week)', desc: 'Standard civic issue', color: 'border-blue-500 hover:bg-blue-50' },
                  { value: '14', label: 'Low Priority (2 weeks)', desc: 'Minor issue, can wait', color: 'border-green-500 hover:bg-green-50' },
                  { value: 'custom', label: 'Custom Timeline', desc: 'Specify your own timeframe', color: 'border-gray-500 hover:bg-gray-50' }
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={expectedResolutionDays === option.value ? "default" : "outline"}
                    className={`w-full h-auto p-4 justify-start text-left ${option.color}`}
                    onClick={() => setExpectedResolutionDays(option.value)}
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                  </Button>
                ))}
              </div>

              {expectedResolutionDays === 'custom' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Custom Timeline (days)</label>
                  <Input
                    key="custom-timeline-input"
                    type="number"
                    placeholder="Enter number of days"
                    value={expectedResolutionDays === 'custom' ? '' : expectedResolutionDays}
                    onChange={(e) => {
                      e.stopPropagation();
                      setExpectedResolutionDays(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }}
                    onFocus={(e) => {
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    autoComplete="off"
                  />
                </div>
              )}

              <Button
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={!expectedResolutionDays}
                onClick={() => {
                  // Create and submit the issue
                  const newIssue: Issue = {
                    id: `new-${Date.now()}`,
                    title: reportDescription.substring(0, 50) + (reportDescription.length > 50 ? '...' : ''),
                    description: reportDescription,
                    category: reportCategory,
                    location: currentLocation 
                      ? `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}${customLocation ? ` (${customLocation})` : ''}` 
                      : customLocation || userProfile.address,
                    status: 'open' as const,
                    reportedBy: userProfile.name,
                    reportedAt: new Date().toISOString().split('T')[0],
                    upvotes: 0,
                    comments: 0,
                    isOwnReport: true,
                    priority: expectedResolutionDays === '1' ? 'high' : 
                             expectedResolutionDays === '3' ? 'high' :
                             expectedResolutionDays === '7' ? 'medium' : 'low',
                    estimatedResolution: (() => {
                      const days = expectedResolutionDays === 'custom' ? parseInt(expectedResolutionDays) || 7 : parseInt(expectedResolutionDays);
                      const futureDate = new Date();
                      futureDate.setDate(futureDate.getDate() + days);
                      return futureDate.toISOString().split('T')[0];
                    })(),
                    imageUrl: uploadedImages[0] || undefined,
                    timeline: [{
                      id: 'initial',
                      date: new Date().toISOString().split('T')[0],
                      status: 'Reported',
                      description: 'Issue reported by citizen',
                      updatedBy: userProfile.name
                    }],
                    commentsList: []
                  };
                  
                  setMyReportsState(prev => [newIssue, ...prev]);
                  setReportDialogOpen(false);
                  resetReportForm();
                }}
              >
                <Upload className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </div>
          )}

          {/* Navigation Buttons */}
          {reportStep > 1 && reportStep < 6 && reportStep !== 3 && reportStep !== 4 && (
            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                className="flex-1"
                onClick={goBackStep}
              >
                Back
              </Button>
              <Button
                className="flex-1"
                onClick={proceedToNextStep}
                disabled={reportStep === 2 && !categoryConfirmed}
              >
                Continue
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div>
        <h3 className="mb-3">Your Recent Reports</h3>
        {myReportsState.slice(0, 3).map(issue => (
          <IssueCard key={issue.id} issue={issue} showActions={false} />
        ))}
        {myReportsState.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No reports yet</p>
            <p className="text-sm">Tap "Report an Issue" to get started</p>
          </div>
        )}
      </div>
    </div>
  );

  const ARScreen = () => (
    <div className="relative h-full bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <Camera className="w-16 h-16 mx-auto mb-4 text-white/80" />
          <p className="text-lg mb-2">AR Camera View</p>
          <p className="text-sm text-white/70 mb-8">Point camera at an issue to report</p>
        </div>
      </div>
      
      {/* AR Overlay UI */}
      <div className="absolute top-16 left-4 right-4">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-3">
            <p className="text-sm">📍 Location detected: Koramangala 5th Block</p>
          </CardContent>
        </Card>
      </div>

      <div className="absolute bottom-8 left-4 right-4 space-y-3">
        <div className="flex gap-2 justify-center">
          <Badge className="bg-blue-500">Roads</Badge>
          <Badge className="bg-green-500">Waste</Badge>
          <Badge className="bg-yellow-500">Safety</Badge>
        </div>
        <Button 
          className="w-full bg-red-500 hover:bg-red-600 text-white h-12 rounded-xl"
          onClick={() => setReportDialogOpen(true)}
        >
          Report This Issue
        </Button>
      </div>
    </div>
  );

  const CommunityScreen = () => (
    <div className="p-4 space-y-4">
      <div className="flex gap-2 items-center">
        <Button
          variant={showMap ? "default" : "outline"}
          size="sm"
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2"
        >
          <Map className="w-4 h-4" />
          {showMap ? 'List View' : 'Map View'}
        </Button>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Roads">Roads</SelectItem>
            <SelectItem value="Waste Management">Waste</SelectItem>
            <SelectItem value="Water Supply">Water</SelectItem>
            <SelectItem value="Public Safety">Safety</SelectItem>
            <SelectItem value="Traffic">Traffic</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showMap ? (
        <Card className="h-96 bg-gray-100 shadow-md">
          <CardContent className="p-8 h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Map className="w-16 h-16 mx-auto mb-4" />
              <p>Interactive Map View</p>
              <p className="text-sm">Issues plotted by location</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>
          <h3 className="mb-3">Community Issues ({filteredCommunityIssues.length})</h3>
          {filteredCommunityIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );

  const MyReportsScreen = () => (
    <div className="p-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All My Reports</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending Verification
            {pendingVerification.length > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                {pendingVerification.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          {allMyReports.map(issue => (
            <IssueCard key={issue.id} issue={issue} showActions={false} />
          ))}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4 mt-4">
          {pendingVerification.map(issue => (
            <Card key={issue.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{issue.title}</CardTitle>
                <Badge className="w-fit bg-blue-100 text-blue-800">Pending Verification</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Before</p>
                    <img 
                      src={issue.beforeImage} 
                      alt="Before" 
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">After</p>
                    <img 
                      src={issue.afterImage} 
                      alt="After" 
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      setSelectedIssue(issue);
                      setRatingDialogOpen(true);
                    }}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Accept (Resolved)
                  </Button>
                  <Button variant="outline" className="flex-1 border-red-500 text-red-500 hover:bg-red-50">
                    <X className="w-4 h-4 mr-2" />
                    Reject (Not Resolved)
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate & Provide Feedback</DialogTitle>
            <DialogDescription>
              Rate the quality of the resolution and provide feedback to help improve civic services.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-2">Rate the resolution quality:</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-8 h-8 text-yellow-400 fill-current cursor-pointer" />
                ))}
              </div>
            </div>
            <Textarea placeholder="Additional feedback (optional)" />
            <Button 
              className="w-full" 
              onClick={() => setRatingDialogOpen(false)}
            >
              Submit Rating & Close Issue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home': return <HomeScreen />;
      case 'ar': return <ARScreen />;
      case 'community': return <CommunityScreen />;
      case 'reports': return <MyReportsScreen />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 overflow-auto">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'ar', icon: Camera, label: 'AR View' },
            { id: 'community', icon: Users, label: 'My Community' },
            { id: 'reports', icon: FileText, label: 'My Reports' }
          ].map(({ id, icon: Icon, label }) => (
            <div key={id} className="relative">
              <Button
                variant="ghost"
                className={`flex flex-col items-center gap-1 h-auto py-2 ${
                  activeScreen === id 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveScreen(id as Screen)}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{label}</span>
              </Button>
              {id === 'reports' && pendingVerification.length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                  {pendingVerification.length}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dialogs */}
      <IssueDetailDialog />
      <UserProfileDialog />
      <NotificationsDialog />
      
      {/* Comment Dialog */}
      <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Add Comment
            </DialogTitle>
            <DialogDescription>
              Share your thoughts about this issue with the community
            </DialogDescription>
          </DialogHeader>
          
          {commentingOnIssue && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-1">{commentingOnIssue.title}</h4>
                <p className="text-xs text-gray-600">{commentingOnIssue.category} • {commentingOnIssue.location}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Comment</label>
                <Textarea
                  key="comment-textarea"
                  value={newComment}
                  onChange={(e) => {
                    e.stopPropagation();
                    setNewComment(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                  }}
                  onFocus={(e) => {
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  placeholder="Write your comment here..."
                  className="min-h-[100px]"
                  maxLength={500}
                  autoComplete="off"
                />
                <div className="text-right">
                  <span className="text-xs text-gray-500">{newComment.length}/500 characters</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setCommentDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={submitComment}
                  disabled={!newComment.trim()}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}