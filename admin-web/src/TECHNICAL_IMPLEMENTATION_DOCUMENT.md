# Civic Issue Reporting & Management System

## Technical Implementation Document (TID)

**Version:** 1.0  
**Last Updated:** December 22, 2025  
**Document Type:** Technical Workflows & Design Architecture

---

## Table of Contents

1. [System Workflow Diagrams](#1-system-workflow-diagrams)
2. [Component Architecture](#2-component-architecture)
3. [API Specifications](#3-api-specifications)
4. [Database Schema](#4-database-schema)
5. [AI Engine Architecture](#5-ai-engine-architecture)
6. [State Management](#6-state-management)
7. [UI Component Library](#7-ui-component-library)
8. [Integration Workflows](#8-integration-workflows)
9. [Performance Optimization](#9-performance-optimization)
10. [Deployment Architecture](#10-deployment-architecture)

---

## 1. System Workflow Diagrams

### 1.1 End-to-End Issue Lifecycle Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CITIZEN MOBILE APP                              │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                        [User Creates Issue Report]
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   1. Form Data Collection     │
                    │   - Title, Description        │
                    │   - Category Selection        │
                    │   - GPS Location Capture      │
                    │   - Ward Auto-Detection       │
                    │   - Photo/Video Upload        │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   2. Client-Side Validation   │
                    │   - Required fields check     │
                    │   - Image size/format         │
                    │   - Location bounds           │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   3. API Request              │
                    │   POST /api/issues/create     │
                    │   Headers: Auth Token         │
                    │   Body: FormData (multipart)  │
                    └───────────────────────────────┘
                                    │
┌────────────────────────────────────────────────────────────────────────┐
│                           BACKEND SERVER                                │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   4. Authentication Check     │
                    │   - Verify JWT token          │
                    │   - Extract user ID           │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   5. Data Sanitization        │
                    │   - XSS prevention            │
                    │   - SQL injection protection  │
                    │   - File type validation      │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   6. File Upload Processing   │
                    │   - Upload to cloud storage   │
                    │   - Generate thumbnails       │
                    │   - Return URLs               │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   7. Generate Unique ID       │
                    │   Format: YY-WARD-XXXXX       │
                    │   Example: 25-W03-00147       │
                    └───────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           AI PROCESSING ENGINE                          │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   8. AI Analysis Pipeline     │
                    └───────────────────────────────┘
                                    │
                    ┌───────────────┴────────────────┐
                    │                                │
                    ▼                                ▼
        ┌──────────────────────┐      ┌──────────────────────┐
        │  NLP Text Analysis   │      │  Image Analysis      │
        │  - Keyword extract   │      │  - Object detection  │
        │  - Sentiment check   │      │  - Damage assessment │
        │  - Context parsing   │      │  - Category hints    │
        └──────────────────────┘      └──────────────────────┘
                    │                                │
                    └───────────────┬────────────────┘
                                    ▼
                    ┌───────────────────────────────┐
                    │   9. Department Classification│
                    │   - Match keywords to dept    │
                    │   - Calculate confidence      │
                    │   - Generate alternatives     │
                    │   - Create reasoning text     │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   10. Priority Scoring        │
                    │   Factors:                    │
                    │   - Safety risk (40%)         │
                    │   - Location criticality (25%)│
                    │   - Issue severity (20%)      │
                    │   - Age of report (10%)       │
                    │   - Duplicate count (5%)      │
                    │   Output: Score 1-100         │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   11. Officer Assignment      │
                    │   Selection Criteria:         │
                    │   - Department match          │
                    │   - Current workload          │
                    │   - Geographic proximity      │
                    │   - Specialization match      │
                    │   - Past performance          │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   12. Resolution Time Estimate│
                    │   Based on:                   │
                    │   - Historical dept avg       │
                    │   - Issue complexity          │
                    │   - Current dept capacity     │
                    │   - Weather conditions        │
                    └───────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           DATABASE LAYER                                │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   13. Database Transaction    │
                    │   BEGIN TRANSACTION           │
                    │   - Insert into issues table  │
                    │   - Insert AI analysis record │
                    │   - Insert timeline event     │
                    │   - Update officer workload   │
                    │   - Update dept statistics    │
                    │   COMMIT                      │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   14. Create Timeline Entry   │
                    │   Event: "Issue Created"      │
                    │   - Timestamp                 │
                    │   - Actor: Citizen            │
                    │   - AI assignment details     │
                    └───────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           NOTIFICATION SYSTEM                           │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
        ┌──────────────────────┐      ┌──────────────────────┐
        │  Citizen Notification│      │  Admin Notification  │
        │  - SMS confirmation  │      │  - WebSocket push    │
        │  - App push notif    │      │  - Email to officer  │
        │  - Tracking ID       │      │  - Dashboard alert   │
        └──────────────────────┘      └──────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   15. Return Response         │
                    │   Status: 201 Created         │
                    │   Body: {                     │
                    │     issueId, trackingId,      │
                    │     assignedDept, officer,    │
                    │     estimatedDays, status     │
                    │   }                           │
                    └───────────────────────────────┘
                                    │
                                    ▼
                        [Display Confirmation]
                        [Store in Local Cache]
```

---

### 1.2 Admin Dashboard Real-Time Update Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ADMIN PORTAL FRONTEND                            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    [Admin Opens Dashboard] ──────┐
                                    │             │
                                    ▼             ▼
                    ┌───────────────────────┐  ┌────────────────────┐
                    │  Initial Data Load    │  │ WebSocket Connect  │
                    │  GET /api/dashboard   │  │ ws://server/admin  │
                    └───────────────────────┘  └────────────────────┘
                                    │             │
                                    ▼             │
                    ┌───────────────────────────┐ │
                    │  Fetch Parallel Requests  │ │
                    │  1. GET /api/issues       │ │
                    │  2. GET /api/stats        │ │
                    │  3. GET /api/notifications│ │
                    │  4. GET /api/map-data     │ │
                    └───────────────────────────┘ │
                                    │             │
                                    ▼             │
                    ┌───────────────────────────┐ │
                    │  Render Initial UI        │ │
                    │  - Stats cards            │ │
                    │  - Map with markers       │ │
                    │  - Issues list            │ │
                    │  - Recent sidebar         │ │
                    └───────────────────────────┘ │
                                    │             │
                    ┌───────────────┴─────────────┘
                    │
                    ▼
        ┌───────────────────────────────────────────┐
        │     [User Applies Filter]                 │
        │     Ward: 3, Priority: High, Status: Open │
        └───────────────────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────────────────────────┐
        │  Update URL Query Parameters              │
        │  ?ward=3&priority=high&status=open        │
        └───────────────────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────────────────────────┐
        │  Dispatch Filter Action (Redux/Context)   │
        │  type: 'SET_FILTERS'                      │
        │  payload: { ward: 3, priority: 'high'...} │
        └───────────────────────────────────────────┘
                    │
        ┌───────────┴───────────────────┐
        │                               │
        ▼                               ▼
┌──────────────────────┐    ┌──────────────────────┐
│  Client-Side Filter  │    │  API Request         │
│  (for cached data)   │    │  GET /api/issues     │
│  - Filter issues[]   │    │  ?filters=...        │
│  - Update UI instant │    │  (background refresh)│
└──────────────────────┘    └──────────────────────┘
        │                               │
        └───────────────┬───────────────┘
                        ▼
        ┌──────────────────────────────────────────┐
        │  Recalculate Stats (from filtered data)  │
        │  - Total issues: count()                 │
        │  - Open issues: filter(status='open')    │
        │  - In Progress: filter(status='progress')│
        │  - Resolved Today: filter(resolvedDate)  │
        └──────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  Update UI Components (React Re-render)  │
        │  ✓ Stats cards animate to new values    │
        │  ✓ Map markers filter/update             │
        │  ✓ Issues list re-sort                   │
        │  ✓ Recent sidebar refresh                │
        │  Duration: ~200ms                        │
        └──────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  [Real-Time Event via WebSocket]         │
        │  Event: "NEW_ISSUE_CREATED"              │
        │  Data: { issueId, priority, ward... }    │
        └──────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  Check if Event Matches Active Filters   │
        │  if (newIssue.ward === activeFilters.ward│
        │      && newIssue.priority === ...)       │
        └──────────────────────────────────────────┘
                        │
            ┌───────────┴───────────┐
            │                       │
            ▼                       ▼
    ┌──────────────┐      ┌──────────────────┐
    │ Match: YES   │      │ Match: NO        │
    │ - Add to list│      │ - Store in bg    │
    │ - Update stats│     │ - Don't display  │
    │ - Show toast │      │ - Update total   │
    └──────────────┘      └──────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  Add to Notification Center              │
        │  - Increment badge count                 │
        │  - Add to notification list              │
        │  - Play notification sound (if enabled)  │
        └──────────────────────────────────────────┘
```

---

### 1.3 AI Department Assignment Detailed Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       AI CATEGORIZATION ENGINE                           │
└─────────────────────────────────────────────────────────────────────────┘

INPUT: Issue Object
{
  title: "Large pothole on Main Street",
  description: "Deep pothole causing vehicle damage, needs urgent repair",
  category: "Potholes",
  location: { lat, lng, address: "123 Main St, Ward 3" },
  images: ["url1.jpg", "url2.jpg"]
}

                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  STEP 1: Text Preprocessing              │
        │  - Convert to lowercase                  │
        │  - Remove stopwords                      │
        │  - Tokenization                          │
        │  - Lemmatization                         │
        │  Output: ["large", "pothole", "main",    │
        │          "street", "deep", "vehicle",    │
        │          "damage", "urgent", "repair"]   │
        └──────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  STEP 2: Keyword Extraction & Weighting  │
        │  Using TF-IDF + Domain Dictionary        │
        │                                          │
        │  Extracted Keywords (weighted):          │
        │  - "pothole" → 0.95 (primary indicator)  │
        │  - "road" → 0.85 (contextual)            │
        │  - "vehicle" → 0.60 (impact indicator)   │
        │  - "repair" → 0.70 (action needed)       │
        │  - "street" → 0.65 (location type)       │
        └──────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  STEP 3: Department Keyword Matching     │
        │  Compare with Department Profiles        │
        └──────────────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
┌────────────────────────┐    ┌────────────────────────┐
│ Roads & Infrastructure │    │ Traffic & Transport    │
│ Keywords:              │    │ Keywords:              │
│ - pothole (1.0)        │    │ - traffic (1.0)        │
│ - road (0.95)          │    │ - signal (0.9)         │
│ - asphalt (0.9)        │    │ - vehicle (0.7)        │
│ - pavement (0.85)      │    │ - parking (0.8)        │
│                        │    │                        │
│ Match Score: 0.92      │    │ Match Score: 0.15      │
└────────────────────────┘    └────────────────────────┘
        │                               │
        └───────────────┬───────────────┘
                        ▼
        ┌──────────────────────────────────────────┐
        │  STEP 4: Context Analysis (NLP)          │
        │  Analyze sentence structure & intent     │
        │                                          │
        │  Detected Context:                       │
        │  - Infrastructure damage: YES            │
        │  - Public safety risk: HIGH              │
        │  - Maintenance required: YES             │
        │  - Emergency service: NO                 │
        │                                          │
        │  Context Confidence Boost: +3%           │
        └──────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  STEP 5: Image Analysis (if available)   │
        │  Using Computer Vision API               │
        │                                          │
        │  Detected Objects:                       │
        │  - road_surface: 0.98                    │
        │  - asphalt_damage: 0.95                  │
        │  - vehicle: 0.45                         │
        │                                          │
        │  Visual Confirmation Boost: +2%          │
        └──────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  STEP 6: Location-Based Analysis         │
        │  Check if location affects categorization│
        │                                          │
        │  Location Type: Main Street (arterial)   │
        │  Near Critical Infrastructure: NO        │
        │  School/Hospital Zone: NO                │
        │                                          │
        │  Location Modifier: +0%                  │
        └──────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  STEP 7: Historical Pattern Analysis     │
        │  Check similar past issues               │
        │                                          │
        │  Similar Issues Found: 147               │
        │  Resolved by Roads Dept: 142 (96.6%)     │
        │  Avg Resolution Time: 4.2 days           │
        │                                          │
        │  Historical Confidence Boost: +1%        │
        └──────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  STEP 8: Final Confidence Calculation    │
        │                                          │
        │  Base Match Score: 92%                   │
        │  + Context Boost: 3%                     │
        │  + Visual Boost: 2%                      │
        │  + Historical Boost: 1%                  │
        │  ─────────────────────                   │
        │  FINAL CONFIDENCE: 98%                   │
        └──────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  STEP 9: Alternative Department Ranking  │
        │                                          │
        │  1. Roads & Infrastructure: 98%          │
        │  2. Traffic & Transport: 15%             │
        │  3. General Administration: 8%           │
        │  4. Public Safety: 5%                    │
        └──────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  STEP 10: Officer Selection Algorithm    │
        │                                          │
        │  Department: Roads & Infrastructure      │
        │  Available Officers: 12                  │
        │                                          │
        │  Filtering Criteria:                     │
        │  1. Specialization: Road Repair (5 off.) │
        │  2. Geographic Zone: Ward 3 (3 officers) │
        │  3. Current Workload (ascending):        │
        │     - Officer A: 3 active issues         │
        │     - Officer B: 5 active issues         │
        │     - Officer C: 7 active issues         │
        │  4. Performance Score (descending):      │
        │     - Officer A: 4.8/5.0                 │
        │                                          │
        │  SELECTED: Officer A (John Doe #R-147)   │
        └──────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  STEP 11: Resolution Time Prediction     │
        │                                          │
        │  Historical Avg (Roads, Potholes): 4.2d  │
        │  Issue Complexity Score: 6/10            │
        │  Department Current Load: Medium         │
        │  Weather Forecast: Clear (no delay)      │
        │  Priority Level: High (expedite -1d)     │
        │                                          │
        │  Calculation:                            │
        │  Base: 4.2 days                          │
        │  × Complexity Factor: 1.0                │
        │  × Load Factor: 1.1                      │
        │  - Priority Adjustment: -1.0             │
        │  ═══════════════════════                 │
        │  ESTIMATED: 3-5 days                     │
        └──────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────────────┐
        │  STEP 12: Generate AI Reasoning Report   │
        │                                          │
        │  "This issue has been categorized as a   │
        │  Roads & Infrastructure matter with 98%  │
        │  confidence. The analysis detected road  │
        │  surface damage keywords including       │
        │  'pothole', 'road', and 'asphalt', which │
        │  are primary indicators for this dept.   │
        │  Visual analysis confirmed asphalt       │
        │  deterioration. Based on 147 similar     │
        │  historical cases, this department has   │
        │  successfully resolved 96.6% of such     │
        │  issues. Officer John Doe has been       │
        │  assigned based on specialization in     │
        │  road repairs, geographic proximity to   │
        │  Ward 3, and current workload capacity.  │
        │  Expected resolution: 3-5 business days."│
        └──────────────────────────────────────────┘
                        │
                        ▼
                    [OUTPUT]
{
  assignedDepartment: "Roads & Infrastructure",
  departmentId: "DEPT-001",
  confidence: 98,
  alternativeDepartments: [
    { name: "Traffic & Transport", confidence: 15 },
    { name: "General Administration", confidence: 8 }
  ],
  reasoning: "This issue has been categorized...",
  priorityScore: 87,
  assignedOfficer: {
    id: "R-147",
    name: "John Doe",
    specialization: "Road Repair",
    workload: 3
  },
  estimatedResolutionDays: "3-5",
  analysisTimestamp: "2025-12-22T10:30:45Z"
}
```

---

### 1.4 Notification Click-to-Detail Workflow

```
        [Admin Notification Panel]
                │
                ▼
┌────────────────────────────────────────────┐
│  Notification List (Recent 10)             │
├────────────────────────────────────────────┤
│  🔴 Critical: Pothole Ward 3 (2 min ago)   │ ← User Clicks
│  🟡 New: Street Light Ward 5 (15 min ago)  │
│  🟢 Resolved: Water Leak Ward 2 (1h ago)   │
└────────────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│  Event: onClick Handler Triggered          │
│  Data: {                                   │
│    notificationId: "notif-12345",          │
│    issueId: "25-W03-00147",                │
│    type: "new_critical_issue"              │
│  }                                         │
└────────────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│  STEP 1: Mark Notification as Read         │
│  API: PATCH /api/notifications/{id}        │
│  Body: { read: true }                      │
│                                            │
│  Update Local State:                       │
│  - Remove from unread count                │
│  - Update badge number (-1)                │
│  - Change notification style (dimmed)      │
└────────────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│  STEP 2: Fetch Full Issue Details          │
│  API: GET /api/issues/{issueId}            │
│                                            │
│  Check Cache First:                        │
│  if (issueCache.has(issueId)) {            │
│    useCache = true (instant load)          │
│  } else {                                  │
│    fetchFromAPI()                          │
│  }                                         │
└────────────────────────────────────────────┘
                │
                ▼
┌─────────────────────���──────────────────────┐
│  STEP 3: Open Issue Detail Modal           │
│  Component: <IssueDetailModal />           │
│                                            │
│  Props: {                                  │
│    issueId: "25-W03-00147",                │
│    isOpen: true,                           │
│    highlightSection: "new_update",         │
│    source: "notification"                  │
│  }                                         │
└────────────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│  STEP 4: Render Modal with Tabs            │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ Modal Header                         │ │
│  │ Issue #25-W03-00147 | High Priority │ │
│  │ [Overview][AI Analysis][Timeline][X]│ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ Tab Content (Overview - Default)     │ │
│  │                                      │ │
│  │ Title: Pothole on Main Street        │ │
│  │ Category: Road Damage                │ │
│  │ Location: [Mini Map Preview]         │ │
│  │ Ward: 3                              │ │
│  │ Status: [Dropdown] Open ▼            │ │
│  │ Reported: Dec 22, 2025 10:15 AM      │ │
│  │                                      │ │
│  │ Description:                         │ │
│  │ Large pothole causing vehicle damage │ │
│  │                                      │ │
│  │ Photos: [Gallery Viewer]             │ │
│  │ [img1] [img2] [img3]                 │ │
│  │                                      │ │
│  │ Reporter: John Smith (Citizen)       │ │
│  │ Contact: ****5678 (anonymized)       │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
                │
        [User Clicks "AI Analysis" Tab]
                │
                ▼
┌────────────────────────────────────────────┐
│  STEP 5: Display AI Analysis Section       │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ 🤖 AI Department Assignment          │ │
│  ├──────────────────────────────────────┤ │
│  │ Assigned Department:                 │ │
│  │ Roads & Infrastructure               │ │
│  │ Confidence: 98% [████████████░] HIGH │ │
│  │                                      │ │
│  │ Assigned Officer:                    │ │
│  │ John Doe (#R-147)                    │ │
│  │ Specialization: Road Repair          │ │
│  │ Current Workload: 3 active issues    │ │
│  │                                      │ │
│  │ Estimated Resolution: 3-5 days       │ │
│  │ Priority Score: 87/100               │ │
│  │                                      │ │
│  │ ─────────────────────────────────    │ │
│  │ AI Reasoning:                        │ │
│  │ "This issue has been categorized as  │ │
│  │ a Roads & Infrastructure matter with │ │
│  │ 98% confidence. The analysis detected│ │
│  │ road surface damage keywords..."     │ │
│  │                                      │ │
│  │ Alternative Departments:             │ │
│  │ • Traffic & Transport (15%)          │ │
│  │ • General Administration (8%)        │ │
│  │                                      │ │
│  │ [Override Assignment] [Confirm]      │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
                │
        [User Clicks "Timeline" Tab]
                │
                ▼
┌────────────────────────────────────────────┐
│  STEP 6: Display Timeline View             │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ 📅 Issue Timeline                    │ │
│  ├──────────────────────────────────────┤ │
│  │                                      │ │
│  │ ● Dec 22, 2025 - 10:15 AM            │ │
│  │   Issue Created                      │ │
│  │   By: John Smith (Citizen)           │ │
│  │   Status: Open                       │ │
│  │                                      │ │
│  │ ● Dec 22, 2025 - 10:15 AM            │ │
│  │   AI Analysis Completed              │ │
│  │   Assigned to: Roads & Infrastructure│ │
│  │   Confidence: 98%                    │ │
│  │                                      │ │
│  │ ● Dec 22, 2025 - 10:16 AM            │ │
│  │   Officer Assigned                   │ │
│  │   Officer: John Doe (#R-147)         │ │
│  │   Auto-assigned by AI                │ │
│  │                                      │ │
│  │ ● Dec 22, 2025 - 10:30 AM ← HIGHLIGHT│ │
│  │   Admin Viewed Issue                 │ │
│  │   By: Admin User                     │ │
│  │   Source: Notification Click         │ │
│  │                                      │ │
│  │ [Add Internal Note]                  │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│  STEP 7: Admin Actions Available           │
│                                            │
│  [Update Status ▼]                         │
│  [Reassign Officer]                        │
│  [Change Priority]                         │
│  [Add Comment]                             │
│  [Request More Info]                       │
│  [Mark as Resolved]                        │
│  [Generate Report]                         │
│                                            │
│  Each action triggers workflow update      │
└────────────────────────────────────────────┘
                │
        [User Updates Status]
                │
                ▼
┌────────────────────────────────────────────┐
│  STEP 8: Status Update Workflow            │
│                                            │
│  Old Status: Open                          │
│  New Status: In Progress                   │
│                                            │
│  API: PATCH /api/issues/{id}/status        │
│  Body: {                                   │
│    status: "in_progress",                  │
│    updatedBy: "admin-user-id",             │
│    timestamp: "2025-12-22T10:35:00Z"       │
│  }                                         │
└────────────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│  Database Transaction:                     │
│  - Update issues.status                    │
│  - Insert timeline event                   │
│  - Update stats cache                      │
│  - Trigger notifications                   │
└────────────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│  Real-Time Updates:                        │
│  - WebSocket broadcast to all admins       │
│  - Push notification to citizen app        │
│  - Email to assigned officer               │
│  - Dashboard stats refresh                 │
└────────────────────────────────────────────┘
                │
                ▼
            [Modal Updates]
            [Notification Sent]
            [Dashboard Refreshed]
```

---

## 2. Component Architecture

### 2.1 React Component Tree

```
App.tsx (Root)
│
├─── <AuthProvider>
│    └─── Authentication Context
│         - User session management
│         - Token refresh logic
│         - Role-based access
│
├─── <ThemeProvider>
│    └─── Dark/Light mode state
│
├─── <NotificationProvider>
│    └─── Toast notifications
│         WebSocket connection
│
└─── <Router>
     │
     ├─── /login → <LoginPage>
     │
     ├─── /dashboard → <DashboardLayout>
     │    │
     │    ├─── <Header>
     │    │    ├─── <Logo>
     │    │    ├─── <GlobalSearch>
     │    │    ├─── <AIAlertCenter>
     │    │    │    ├─── <NotificationBadge>
     │    │    │    └─── <NotificationDropdown>
     │    │    │         └─── <NotificationItem> (map)
     │    │    │              - onClick → openIssueModal
     │    │    └─── <UserProfile>
     │    │
     │    ├─── <Sidebar>
     │    │    ├─── <NavItem> Dashboard
     │    │    ├─── <NavItem> Notifications
     │    │    ├─── <NavItem> Analytics
     │    │    └─── <NavItem> Settings
     │    │
     │    └─── <DashboardContent>
     │         │
     │         ├─── <FilterBar>
     │         │    ├─── <WardFilter>
     │         │    ├─── <CategoryFilter>
     │         │    ├─── <PriorityFilter>
     │         │    ├─── <StatusFilter>
     │         │    └─── <DateRangePicker>
     │         │
     │         ├─── <StatsGrid>
     │         │    ├─── <StatCard title="Total Issues">
     │         │    ├─── <StatCard title="Open Issues">
     │         │    ├─── <StatCard title="In Progress">
     │         │    └─── <StatCard title="Resolved Today">
     │         │
     │         ├─── <MainContent>
     │         │    │
     │         │    ├─── <InteractiveMap> (60% width)
     │         │    │    ├─── <MapContainer> (react-leaflet)
     │         │    │    ├─── <IssueMarker> (map, clustered)
     │         │    │    │    └─── onClick → <MarkerPopup>
     │         │    │    │         └─── onClick → openIssueModal
     │         │    │    └─── <MapControls>
     │         │    │
     │         │    └─── <RecentIssuesSidebar> (40% width)
     │         │         └─── <IssueCard> (map)
     │         │              ├─── Issue metadata
     │         │              ├─── AI confidence badge
     │         │              └─── onClick → openIssueModal
     │         │
     │         └─── <IssuesListTable>
     │              ├─── <TableHeader>
     │              │    └─── Sortable columns
     │              ├─── <TableBody>
     │              │    └─── <IssueRow> (map)
     │              │         ├─── Priority icon
     │              │         ├─── Issue details
     │              │         ├─── AI department badge
     │              │         ├─── AI confidence score
     │              │         └─── Action buttons
     │              └─── <TablePagination>
     │
     ├─── /notifications → <NotificationsPage>
     │    ├─── <NotificationFilters>
     │    ├─── <NotificationsList>
     │    │    └─── <NotificationCard> (map)
     │    │         └─── onClick → openIssueModal
     │    └─── <MarkAllRead>
     │
     ├─── /analytics → <AnalyticsPage>
     │    ├─── <AnalyticsFilters>
     │    ├─── <ChartsGrid>
     │    │    ├─── <IssuesByCategoryChart> (Pie)
     │    │    ├─── <IssuesByWardChart> (Bar)
     │    │    ├─── <ResolutionTrendChart> (Line)
     │    │    └─── <OfficerPerformanceChart>
     │    └─── <ReportGenerator>
     │
     └─── /settings → <SettingsPage>
          ├─── <SystemSettings>
          ├─── <DepartmentManagement>
          ├─── <OfficerManagement>
          └─── <UserPreferences>

SHARED COMPONENTS (across pages):
│
├─── <IssueDetailModal> ★ Core Component
│    │
│    ├─── Props: { issueId, isOpen, onClose, source }
│    │
│    ├─── <ModalHeader>
│    │    ├─── Issue ID & badges
│    │    ├─── Status dropdown (editable)
│    │    └─── Close button
│    │
│    ├─── <TabNavigation>
│    │    ├─── Tab: Overview
│    │    ├─── Tab: AI Analysis
│    │    ├─── Tab: Timeline
│    │    └─── Tab: Actions
│    │
│    └─── <TabContent>
│         │
│         ├─── <OverviewTab>
│         │    ├─── <IssueInfo>
│         │    ├─── <LocationMap>
│         │    ├─── <PhotoGallery>
│         │    └─── <ReporterInfo>
│         │
│         ├─── <AIAnalysisTab>
│         │    ├─── <DepartmentAssignment>
│         │    │    ├─── Department name
│         │    │    ├─── Confidence meter
│         │    │    └─── Officer details
│         │    ├─── <AIReasoning>
│         │    │    └─── Full explanation text
│         │    ├─── <AlternativeDepartments>
│         │    │    └─── List with confidence %
│         │    └─── <OverrideActions>
│         │
│         ├─── <TimelineTab>
│         │    └─── <TimelineEvent> (map)
│         │         ├─── Timestamp
│         │         ├─── Event type icon
│         │         ├─── Description
│         │         └─── Actor info
│         │
│         └─── <ActionsTab>
│              ├─── <StatusUpdateForm>
│              ├─── <ReassignOfficerForm>
│              ├─── <PriorityChangeForm>
│              ├─── <AddCommentForm>
│              └─── <ResolveIssueForm>
│
├─── <ConfirmDialog>
├─── <LoadingSpinner>
├─── <ErrorBoundary>
└─── <Toast>
```

---

### 2.2 State Management Architecture

```javascript
// Using React Context API + useReducer (or Redux if preferred)

// 1. GLOBAL STATE STRUCTURE
const GlobalState = {
  auth: {
    user: { id, name, role, email },
    token: "jwt_token",
    isAuthenticated: boolean,
  },

  filters: {
    wards: [],
    categories: [],
    priorities: [],
    statuses: [],
    dateRange: { start, end },
  },

  issues: {
    list: [], // Full issues array
    filtered: [], // After applying filters
    selectedIssue: null,
    loading: boolean,
    error: null,
    pagination: { page, limit, total },
  },

  stats: {
    total: 0,
    open: 0,
    inProgress: 0,
    resolvedToday: 0,
    loading: boolean,
  },

  notifications: {
    list: [],
    unreadCount: 0,
    loading: boolean,
  },

  map: {
    center: [lat, lng],
    zoom: 12,
    markers: [],
    selectedMarker: null,
  },

  ui: {
    sidebarOpen: boolean,
    theme: 'light' | 'dark',
    modalOpen: boolean,
    modalType: string,
  },

  realtime: {
    connected: boolean,
    lastUpdate: timestamp,
  },
};

// 2. ACTIONS
const Actions = {
  // Auth
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',

  // Filters
  SET_FILTERS: 'SET_FILTERS',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  UPDATE_FILTER: 'UPDATE_FILTER',

  // Issues
  FETCH_ISSUES_REQUEST: 'FETCH_ISSUES_REQUEST',
  FETCH_ISSUES_SUCCESS: 'FETCH_ISSUES_SUCCESS',
  FETCH_ISSUES_FAILURE: 'FETCH_ISSUES_FAILURE',
  APPLY_FILTERS: 'APPLY_FILTERS',
  SELECT_ISSUE: 'SELECT_ISSUE',
  UPDATE_ISSUE: 'UPDATE_ISSUE',
  ADD_NEW_ISSUE: 'ADD_NEW_ISSUE', // WebSocket

  // Stats
  UPDATE_STATS: 'UPDATE_STATS',

  // Notifications
  FETCH_NOTIFICATIONS: 'FETCH_NOTIFICATIONS',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION', // WebSocket

  // UI
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  SET_THEME: 'SET_THEME',

  // WebSocket
  WS_CONNECTED: 'WS_CONNECTED',
  WS_DISCONNECTED: 'WS_DISCONNECTED',
  WS_MESSAGE: 'WS_MESSAGE',
};

// 3. REDUCERS
function filtersReducer(state, action) {
  switch (action.type) {
    case 'SET_FILTERS':
      return { ...state, ...action.payload };

    case 'UPDATE_FILTER':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    case 'CLEAR_FILTERS':
      return {
        wards: [],
        categories: [],
        priorities: [],
        statuses: [],
        dateRange: null,
      };

    default:
      return state;
  }
}

function issuesReducer(state, action) {
  switch (action.type) {
    case 'FETCH_ISSUES_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_ISSUES_SUCCESS':
      return {
        ...state,
        list: action.payload,
        filtered: action.payload, // Initial
        loading: false,
        error: null,
      };

    case 'APPLY_FILTERS':
      const filtered = applyFilters(state.list, action.payload);
      return { ...state, filtered };

    case 'ADD_NEW_ISSUE':
      return {
        ...state,
        list: [action.payload, ...state.list],
        filtered: [action.payload, ...state.filtered],
      };

    case 'UPDATE_ISSUE':
      return {
        ...state,
        list: state.list.map(issue =>
          issue.id === action.payload.id
            ? { ...issue, ...action.payload.updates }
            : issue
        ),
      };

    default:
      return state;
  }
}

// 4. SELECTORS (Memoized)
import { useMemo } from 'react';

function useFilteredIssues(issues, filters) {
  return useMemo(() => {
    return issues.filter(issue => {
      // Ward filter
      if (filters.wards.length && !filters.wards.includes(issue.location.ward)) {
        return false;
      }

      // Category filter
      if (filters.categories.length && !filters.categories.includes(issue.category)) {
        return false;
      }

      // Priority filter
      if (filters.priorities.length && !filters.priorities.includes(issue.priority)) {
        return false;
      }

      // Status filter
      if (filters.statuses.length && !filters.statuses.includes(issue.status)) {
        return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const issueDate = new Date(issue.reportedDate);
        if (issueDate < filters.dateRange.start || issueDate > filters.dateRange.end) {
          return false;
        }
      }

      return true;
    });
  }, [issues, filters]);
}

function useCalculatedStats(filteredIssues) {
  return useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);

    return {
      total: filteredIssues.length,
      open: filteredIssues.filter(i => i.status === 'open').length,
      inProgress: filteredIssues.filter(i => i.status === 'in_progress').length,
      resolvedToday: filteredIssues.filter(i => {
        if (i.status === 'resolved' && i.resolutionDetails?.resolvedDate) {
          const resolvedDate = new Date(i.resolutionDetails.resolvedDate).setHours(0, 0, 0, 0);
          return resolvedDate === today;
        }
        return false;
      }).length,
    };
  }, [filteredIssues]);
}
```

---

### 2.3 WebSocket Integration

```javascript
// WebSocket Manager
class WebSocketManager {
  constructor(url, token) {
    this.url = url;
    this.token = token;
    this.ws = null;
    this.reconnectInterval = 5000;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.listeners = new Map();
  }

  connect() {
    this.ws = new WebSocket(`${this.url}?token=${this.token}`);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.emit('connected');
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.emit('disconnected');
      this.attemptReconnect();
    };
  }

  handleMessage(data) {
    switch (data.type) {
      case 'NEW_ISSUE':
        this.emit('newIssue', data.payload);
        break;

      case 'ISSUE_UPDATED':
        this.emit('issueUpdated', data.payload);
        break;

      case 'ISSUE_RESOLVED':
        this.emit('issueResolved', data.payload);
        break;

      case 'NOTIFICATION':
        this.emit('notification', data.payload);
        break;

      case 'STATS_UPDATE':
        this.emit('statsUpdate', data.payload);
        break;

      default:
        console.warn('Unknown message type:', data.type);
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
        this.connect();
      }, this.reconnectInterval);
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  send(type, payload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

// React Hook for WebSocket
function useWebSocket() {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const wsRef = useRef(null);

  useEffect(() => {
    if (token) {
      wsRef.current = new WebSocketManager('wss://api.example.com/ws', token);
      wsRef.current.connect();

      // Listen to events
      wsRef.current.on('newIssue', (issue) => {
        dispatch({ type: 'ADD_NEW_ISSUE', payload: issue });
        dispatch({ type: 'ADD_NOTIFICATION', payload: {
          type: 'new_issue',
          issueId: issue.id,
          message: `New ${issue.priority} priority issue in Ward ${issue.location.ward}`,
          timestamp: new Date(),
        }});
      });

      wsRef.current.on('issueUpdated', (update) => {
        dispatch({ type: 'UPDATE_ISSUE', payload: update });
      });

      wsRef.current.on('notification', (notification) => {
        dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
      });

      return () => {
        wsRef.current.disconnect();
      };
    }
  }, [token, dispatch]);

  return wsRef.current;
}
```

---

## 3. API Specifications

### 3.1 REST API Endpoints

```yaml
BASE_URL: https://api.civic-issue-system.com/v1

# ================================
# AUTHENTICATION
# ================================

POST /auth/login
  Request:
    {
      "email": "admin@city.gov",
      "password": "secure_password"
    }
  Response: 200
    {
      "token": "jwt_token",
      "user": {
        "id": "user_123",
        "name": "Admin User",
        "role": "admin",
        "email": "admin@city.gov"
      }
    }

POST /auth/refresh
  Headers: { "Authorization": "Bearer {token}" }
  Response: 200
    {
      "token": "new_jwt_token"
    }

# ================================
# ISSUES
# ================================

GET /issues
  Query Parameters:
    - page: number (default: 1)
    - limit: number (default: 50)
    - ward: string | array
    - category: string | array
    - priority: string | array
    - status: string | array
    - dateFrom: ISO8601
    - dateTo: ISO8601
    - sortBy: string (default: "aiPriority")
    - sortOrder: "asc" | "desc"

  Response: 200
    {
      "data": [
        {
          "id": "25-W03-00147",
          "title": "Pothole on Main Street",
          "description": "Large pothole...",
          "category": "Potholes",
          "location": {
            "latitude": 40.7128,
            "longitude": -74.0060,
            "address": "123 Main St",
            "ward": "3"
          },
          "priority": "high",
          "status": "open",
          "reportedBy": {
            "userId": "citizen_456",
            "name": "John Smith",
            "contact": "****5678"
          },
          "reportedDate": "2025-12-22T10:15:00Z",
          "aiAnalysis": {
            "assignedDepartment": "Roads & Infrastructure",
            "departmentId": "DEPT-001",
            "confidence": 98,
            "alternativeDepartments": [
              { "name": "Traffic & Transport", "confidence": 15 }
            ],
            "reasoning": "This issue has been categorized...",
            "priorityScore": 87,
            "estimatedResolutionDays": "3-5"
          },
          "assignedOfficer": {
            "officerId": "R-147",
            "name": "John Doe",
            "department": "Roads & Infrastructure"
          },
          "proofUploads": [
            {
              "type": "image",
              "url": "https://cdn.example.com/issue-147-1.jpg",
              "thumbnail": "https://cdn.example.com/issue-147-1-thumb.jpg",
              "uploadedAt": "2025-12-22T10:15:30Z"
            }
          ]
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 50,
        "total": 1247,
        "pages": 25
      },
      "meta": {
        "timestamp": "2025-12-22T10:30:00Z",
        "cached": false
      }
    }

GET /issues/:id
  Response: 200
    {
      "data": { /* Full issue object with timeline */ }
    }

POST /issues
  Headers: { "Content-Type": "multipart/form-data" }
  Request:
    {
      "title": "string",
      "description": "string",
      "category": "string",
      "latitude": "number",
      "longitude": "number",
      "address": "string",
      "ward": "string",
      "images": [File, File],
      "videos": [File]
    }
  Response: 201
    {
      "data": {
        "issueId": "25-W03-00148",
        "trackingId": "TRK-2025-12-00148",
        "assignedDepartment": "...",
        "estimatedResolution": "3-5 days"
      }
    }

PATCH /issues/:id
  Request:
    {
      "status": "in_progress",
      "priority": "high",
      "assignedOfficer": "R-150",
      "notes": "Inspection scheduled"
    }
  Response: 200
    {
      "data": { /* Updated issue object */ }
    }

PATCH /issues/:id/status
  Request:
    {
      "status": "resolved",
      "resolutionNotes": "Pothole filled",
      "proofUrl": "https://..."
    }
  Response: 200

# ================================
# STATS & ANALYTICS
# ================================

GET /stats/dashboard
  Query Parameters:
    - ward: string | array
    - category: string | array
    - priority: string | array
    - status: string | array
    - dateFrom: ISO8601
    - dateTo: ISO8601

  Response: 200
    {
      "stats": {
        "total": 1247,
        "open": 342,
        "inProgress": 518,
        "resolvedToday": 28,
        "byWard": [
          { "ward": "1", "count": 145 },
          { "ward": "2", "count": 198 }
        ],
        "byCategory": [
          { "category": "Potholes", "count": 312 },
          { "category": "Street Lights", "count": 245 }
        ],
        "byPriority": {
          "high": 156,
          "medium": 687,
          "low": 404
        },
        "avgResolutionTime": 4.2,
        "aiAccuracy": 94.5
      }
    }

GET /analytics/trends
  Query Parameters:
    - period: "7d" | "30d" | "90d" | "1y"
    - groupBy: "day" | "week" | "month"

  Response: 200
    {
      "data": [
        {
          "date": "2025-12-15",
          "created": 45,
          "resolved": 38,
          "avgResolutionTime": 4.1
        }
      ]
    }

# ================================
# NOTIFICATIONS
# ================================

GET /notifications
  Query Parameters:
    - page: number
    - limit: number
    - unreadOnly: boolean

  Response: 200
    {
      "data": [
        {
          "id": "notif-12345",
          "type": "new_critical_issue",
          "issueId": "25-W03-00147",
          "title": "Critical: Pothole in Ward 3",
          "message": "High priority issue detected",
          "timestamp": "2025-12-22T10:15:00Z",
          "read": false,
          "priority": "high"
        }
      ],
      "unreadCount": 12
    }

PATCH /notifications/:id/read
  Response: 200

POST /notifications/mark-all-read
  Response: 200

# ================================
# DEPARTMENTS & OFFICERS
# ================================

GET /departments
  Response: 200
    {
      "data": [
        {
          "id": "DEPT-001",
          "name": "Roads & Infrastructure",
          "description": "...",
          "keywords": ["pothole", "road", "asphalt"],
          "avgResolutionTime": 4.2,
          "activeIssues": 87,
          "officers": 12
        }
      ]
    }

GET /departments/:id/officers
  Response: 200
    {
      "data": [
        {
          "id": "R-147",
          "name": "John Doe",
          "specialization": "Road Repair",
          "currentWorkload": 3,
          "performanceScore": 4.8,
          "contactInfo": "..."
        }
      ]
    }

# ================================
# AI ANALYSIS
# ================================

POST /ai/analyze-issue
  Request:
    {
      "title": "string",
      "description": "string",
      "category": "string",
      "images": ["url1", "url2"]
    }
  Response: 200
    {
      "analysis": {
        "suggestedDepartment": "Roads & Infrastructure",
        "confidence": 98,
        "reasoning": "...",
        "priorityScore": 87,
        "estimatedDays": "3-5"
      }
    }

GET /ai/accuracy-report
  Query Parameters:
    - period: "7d" | "30d" | "90d"
  Response: 200
    {
      "accuracy": 94.5,
      "totalPredictions": 1247,
      "correctPredictions": 1179,
      "manualOverrides": 68,
      "confidenceDistribution": {
        "high": 87.3,
        "medium": 10.2,
        "low": 2.5
      }
    }

# ================================
# MAP DATA
# ================================

GET /map/markers
  Query Parameters:
    - bounds: "minLat,minLng,maxLat,maxLng"
    - ward: string | array
    - priority: string | array
    - status: string | array

  Response: 200
    {
      "markers": [
        {
          "id": "25-W03-00147",
          "lat": 40.7128,
          "lng": -74.0060,
          "priority": "high",
          "category": "Potholes",
          "status": "open",
          "preview": {
            "title": "Pothole on Main Street",
            "reportedDate": "2025-12-22T10:15:00Z"
          }
        }
      ]
    }

# ================================
# ERROR RESPONSES
# ================================

400 Bad Request:
  {
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Invalid request parameters",
      "details": [
        {
          "field": "ward",
          "message": "Ward must be a valid number"
        }
      ]
    }
  }

401 Unauthorized:
  {
    "error": {
      "code": "UNAUTHORIZED",
      "message": "Invalid or expired token"
    }
  }

404 Not Found:
  {
    "error": {
      "code": "RESOURCE_NOT_FOUND",
      "message": "Issue not found"
    }
  }

500 Internal Server Error:
  {
    "error": {
      "code": "INTERNAL_ERROR",
      "message": "An unexpected error occurred",
      "requestId": "req_xyz123"
    }
  }
```

---

## 4. Database Schema

### 4.1 PostgreSQL Schema

```sql
-- ================================
-- USERS TABLE
-- ================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL, -- 'admin', 'officer', 'citizen'
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ================================
-- DEPARTMENTS TABLE
-- ================================
CREATE TABLE departments (
  id VARCHAR(20) PRIMARY KEY, -- 'DEPT-001'
  name VARCHAR(255) NOT NULL,
  description TEXT,
  keywords JSONB, -- Array of keywords for AI matching
  avg_resolution_time DECIMAL(5,2), -- in days
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_departments_keywords ON departments USING GIN(keywords);

-- ================================
-- OFFICERS TABLE
-- ================================
CREATE TABLE officers (
  id VARCHAR(20) PRIMARY KEY, -- 'R-147'
  user_id UUID REFERENCES users(id),
  department_id VARCHAR(20) REFERENCES departments(id),
  specialization VARCHAR(255),
  geographic_zone VARCHAR(50), -- Ward assignment
  current_workload INTEGER DEFAULT 0,
  performance_score DECIMAL(3,2), -- 0.00 - 5.00
  max_capacity INTEGER DEFAULT 10,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_officers_department ON officers(department_id);
CREATE INDEX idx_officers_zone ON officers(geographic_zone);
CREATE INDEX idx_officers_workload ON officers(current_workload);

-- ================================
-- ISSUES TABLE (Main)
-- ================================
CREATE TABLE issues (
  id VARCHAR(20) PRIMARY KEY, -- '25-W03-00147'
  tracking_id VARCHAR(30) UNIQUE, -- 'TRK-2025-12-00147'
  title VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  priority VARCHAR(20) NOT NULL, -- 'high', 'medium', 'low'
  status VARCHAR(50) NOT NULL DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'

  -- Location
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT,
  ward VARCHAR(10) NOT NULL,

  -- Reporter
  reported_by UUID REFERENCES users(id),
  reporter_name VARCHAR(255),
  reporter_contact VARCHAR(20), -- Partially anonymized

  -- Assignment
  assigned_department VARCHAR(20) REFERENCES departments(id),
  assigned_officer VARCHAR(20) REFERENCES officers(id),
  assigned_at TIMESTAMP,

  -- Timestamps
  reported_date TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  resolved_date TIMESTAMP,
  closed_date TIMESTAMP,

  -- Resolution
  resolution_notes TEXT,
  resolution_proof_url TEXT,

  -- Metadata
  source VARCHAR(50) DEFAULT 'mobile_app', -- 'mobile_app', 'web', 'hotline'
  is_duplicate BOOLEAN DEFAULT FALSE,
  duplicate_of VARCHAR(20) REFERENCES issues(id),
  views_count INTEGER DEFAULT 0,

  CONSTRAINT check_priority CHECK (priority IN ('high', 'medium', 'low')),
  CONSTRAINT check_status CHECK (status IN ('open', 'in_progress', 'resolved', 'closed'))
);

CREATE INDEX idx_issues_ward ON issues(ward);
CREATE INDEX idx_issues_category ON issues(category);
CREATE INDEX idx_issues_priority ON issues(priority);
CREATE INDEX idx_issues_status ON issues(status);
CREATE INDEX idx_issues_reported_date ON issues(reported_date DESC);
CREATE INDEX idx_issues_location ON issues USING GIST(point(latitude, longitude));
CREATE INDEX idx_issues_assigned_officer ON issues(assigned_officer);
CREATE INDEX idx_issues_assigned_department ON issues(assigned_department);

-- ================================
-- AI_ANALYSIS TABLE
-- ================================
CREATE TABLE ai_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id VARCHAR(20) REFERENCES issues(id) ON DELETE CASCADE,

  -- Department Categorization
  assigned_department VARCHAR(20) REFERENCES departments(id),
  confidence_score INTEGER, -- 0-100
  alternative_departments JSONB, -- [{ name, confidence }, ...]
  reasoning TEXT,

  -- Priority Scoring
  priority_score INTEGER, -- 1-100
  priority_factors JSONB, -- { safety: 40, location: 25, ... }

  -- Resolution Estimation
  estimated_resolution_days VARCHAR(10), -- '3-5'
  estimated_complexity VARCHAR(20), -- 'low', 'medium', 'high'

  -- Metadata
  model_version VARCHAR(20),
  analysis_timestamp TIMESTAMP DEFAULT NOW(),
  processing_time_ms INTEGER,

  -- Validation
  was_accurate BOOLEAN, -- Set after issue is resolved
  manual_override BOOLEAN DEFAULT FALSE,
  override_reason TEXT
);

CREATE INDEX idx_ai_analysis_issue ON ai_analysis(issue_id);
CREATE INDEX idx_ai_analysis_confidence ON ai_analysis(confidence_score);
CREATE INDEX idx_ai_analysis_timestamp ON ai_analysis(analysis_timestamp);

-- ================================
-- PROOF_UPLOADS TABLE
-- ================================
CREATE TABLE proof_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id VARCHAR(20) REFERENCES issues(id) ON DELETE CASCADE,
  file_type VARCHAR(20) NOT NULL, -- 'image', 'video'
  original_url TEXT NOT NULL,
  thumbnail_url TEXT,
  file_size INTEGER, -- in bytes
  mime_type VARCHAR(100),
  uploaded_at TIMESTAMP DEFAULT NOW(),
  uploaded_by UUID REFERENCES users(id)
);

CREATE INDEX idx_proof_uploads_issue ON proof_uploads(issue_id);

-- ================================
-- TIMELINE TABLE
-- ================================
CREATE TABLE timeline_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id VARCHAR(20) REFERENCES issues(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- 'created', 'assigned', 'status_changed', 'comment_added', etc.
  description TEXT NOT NULL,
  actor_id UUID REFERENCES users(id),
  actor_name VARCHAR(255),
  actor_role VARCHAR(50),
  metadata JSONB, -- Flexible field for event-specific data
  timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_timeline_issue ON timeline_events(issue_id);
CREATE INDEX idx_timeline_timestamp ON timeline_events(timestamp DESC);

-- ================================
-- NOTIFICATIONS TABLE
-- ================================
CREATE TABLE notifications (
  id VARCHAR(30) PRIMARY KEY, -- 'notif-12345'
  user_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL, -- 'new_issue', 'status_update', 'assignment', etc.
  issue_id VARCHAR(20) REFERENCES issues(id),
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'normal', -- 'critical', 'high', 'normal'
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- ================================
-- ANALYTICS CACHE TABLE
-- ================================
CREATE TABLE analytics_cache (
  id VARCHAR(100) PRIMARY KEY, -- 'stats_dashboard_2025-12-22'
  cache_type VARCHAR(50) NOT NULL,
  filters JSONB,
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

CREATE INDEX idx_analytics_cache_type ON analytics_cache(cache_type);
CREATE INDEX idx_analytics_cache_expires ON analytics_cache(expires_at);

-- ================================
-- TRIGGERS
-- ================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_issues_updated_at
  BEFORE UPDATE ON issues
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Update officer workload
CREATE OR REPLACE FUNCTION update_officer_workload()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.assigned_officer IS NOT NULL AND NEW.assigned_officer != OLD.assigned_officer) THEN
    -- Increment new officer's workload
    UPDATE officers
    SET current_workload = current_workload + 1
    WHERE id = NEW.assigned_officer;

    -- Decrement old officer's workload
    IF (OLD.assigned_officer IS NOT NULL) THEN
      UPDATE officers
      SET current_workload = current_workload - 1
      WHERE id = OLD.assigned_officer;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_officer_workload_trigger
  AFTER UPDATE OF assigned_officer ON issues
  FOR EACH ROW
  EXECUTE FUNCTION update_officer_workload();

-- Auto-create timeline events
CREATE OR REPLACE FUNCTION create_timeline_event()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO timeline_events (issue_id, event_type, description, actor_id)
    VALUES (NEW.id, 'created', 'Issue created', NEW.reported_by);
  ELSIF (TG_OP = 'UPDATE') THEN
    IF (NEW.status != OLD.status) THEN
      INSERT INTO timeline_events (issue_id, event_type, description, metadata)
      VALUES (NEW.id, 'status_changed', 'Status updated', json_build_object('old', OLD.status, 'new', NEW.status));
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_create_timeline
  AFTER INSERT OR UPDATE ON issues
  FOR EACH ROW
  EXECUTE FUNCTION create_timeline_event();

-- ================================
-- VIEWS
-- ================================

-- Active Issues View
CREATE VIEW active_issues_view AS
SELECT
  i.*,
  d.name as department_name,
  o.name as officer_name,
  ai.confidence_score,
  ai.reasoning as ai_reasoning,
  ai.estimated_resolution_days,
  COUNT(p.id) as proof_count
FROM issues i
LEFT JOIN departments d ON i.assigned_department = d.id
LEFT JOIN officers o ON i.assigned_officer = o.id
LEFT JOIN ai_analysis ai ON i.id = ai.issue_id
LEFT JOIN proof_uploads p ON i.id = p.issue_id
WHERE i.status IN ('open', 'in_progress')
GROUP BY i.id, d.name, o.name, ai.confidence_score, ai.reasoning, ai.estimated_resolution_days;

-- Dashboard Stats View
CREATE VIEW dashboard_stats_view AS
SELECT
  COUNT(*) as total_issues,
  COUNT(*) FILTER (WHERE status = 'open') as open_issues,
  COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_issues,
  COUNT(*) FILTER (WHERE status = 'resolved' AND DATE(resolved_date) = CURRENT_DATE) as resolved_today,
  AVG(EXTRACT(EPOCH FROM (COALESCE(resolved_date, NOW()) - reported_date))/86400) as avg_resolution_days
FROM issues
WHERE reported_date >= CURRENT_DATE - INTERVAL '30 days';
```

---

## 5. AI Engine Architecture

### 5.1 AI Model Pipeline

```python
# AI Department Categorization Service
# Python/TensorFlow Implementation

import tensorflow as tf
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

class DepartmentCategorizationEngine:
    def __init__(self, departments_config):
        """
        Initialize AI engine with department configurations
        """
        self.departments = departments_config
        self.vectorizer = TfidfVectorizer(
            max_features=500,
            stop_words='english',
            ngram_range=(1, 3)
        )
        self.keyword_weights = self._load_keyword_weights()
        self.model = self._load_pretrained_model()

    def analyze_issue(self, issue_data):
        """
        Main analysis function

        Args:
            issue_data: {
                'title': str,
                'description': str,
                'category': str,
                'location': {'ward': str, 'address': str},
                'images': [url1, url2]
            }

        Returns:
            {
                'department': str,
                'confidence': int,
                'alternatives': [],
                'reasoning': str,
                'priority_score': int
            }
        """
        # Step 1: Text preprocessing
        text = self._preprocess_text(issue_data)

        # Step 2: Keyword extraction
        keywords = self._extract_keywords(text)

        # Step 3: Department matching
        dept_scores = self._match_departments(keywords, issue_data['category'])

        # Step 4: Context analysis
        context_boost = self._analyze_context(text, issue_data)

        # Step 5: Image analysis (if available)
        image_boost = 0
        if issue_data.get('images'):
            image_boost = self._analyze_images(issue_data['images'])

        # Step 6: Historical pattern matching
        historical_boost = self._check_historical_patterns(issue_data)

        # Step 7: Calculate final scores
        final_scores = {}
        for dept_id, base_score in dept_scores.items():
            final_scores[dept_id] = min(100, int(
                base_score +
                context_boost.get(dept_id, 0) +
                image_boost +
                historical_boost.get(dept_id, 0)
            ))

        # Step 8: Rank departments
        sorted_depts = sorted(
            final_scores.items(),
            key=lambda x: x[1],
            reverse=True
        )

        # Step 9: Generate reasoning
        reasoning = self._generate_reasoning(
            top_dept=sorted_depts[0],
            keywords=keywords,
            context=context_boost
        )

        # Step 10: Calculate priority score
        priority_score = self._calculate_priority(issue_data, keywords)

        return {
            'department': self.departments[sorted_depts[0][0]]['name'],
            'department_id': sorted_depts[0][0],
            'confidence': sorted_depts[0][1],
            'alternatives': [
                {
                    'name': self.departments[dept_id]['name'],
                    'confidence': score
                }
                for dept_id, score in sorted_depts[1:4]
            ],
            'reasoning': reasoning,
            'priority_score': priority_score
        }

    def _preprocess_text(self, issue_data):
        """
        Clean and prepare text for analysis
        """
        text = f"{issue_data['title']} {issue_data['description']}"
        # Lowercase
        text = text.lower()
        # Remove special characters
        text = re.sub(r'[^a-z0-9\s]', '', text)
        # Remove extra whitespace
        text = ' '.join(text.split())
        return text

    def _extract_keywords(self, text):
        """
        Extract weighted keywords using TF-IDF
        """
        # Tokenize
        tokens = text.split()

        # Calculate TF-IDF
        tfidf_matrix = self.vectorizer.fit_transform([text])
        feature_names = self.vectorizer.get_feature_names_out()

        # Get scores
        scores = tfidf_matrix.toarray()[0]

        # Create keyword-score pairs
        keywords = {
            feature_names[i]: scores[i]
            for i in range(len(feature_names))
            if scores[i] > 0
        }

        # Boost domain-specific keywords
        for keyword, base_score in keywords.items():
            if keyword in self.keyword_weights:
                keywords[keyword] = base_score * self.keyword_weights[keyword]

        return keywords

    def _match_departments(self, keywords, category):
        """
        Match keywords to department profiles
        """
        scores = {}

        for dept_id, dept_config in self.departments.items():
            dept_keywords = dept_config['keywords']
            score = 0

            for keyword, weight in keywords.items():
                if keyword in dept_keywords:
                    # Keyword match score
                    keyword_importance = dept_keywords[keyword]
                    score += weight * keyword_importance * 100

            # Category boost
            if category in dept_config.get('primary_categories', []):
                score *= 1.2

            scores[dept_id] = min(100, int(score))

        return scores

    def _analyze_context(self, text, issue_data):
        """
        Analyze sentence structure and context
        """
        boost = {}

        # Safety keywords detection
        safety_keywords = ['dangerous', 'urgent', 'emergency', 'hazard', 'risk']
        if any(kw in text for kw in safety_keywords):
            boost['PUBLIC_SAFETY'] = 5

        # Infrastructure damage keywords
        infra_keywords = ['broken', 'damaged', 'cracked', 'deteriorated']
        if any(kw in text for kw in infra_keywords):
            boost['ROADS_INFRA'] = 3

        return boost

    def _analyze_images(self, image_urls):
        """
        Analyze images using computer vision API
        (Placeholder for actual CV integration)
        """
        # Would integrate with Google Vision API, AWS Rekognition, etc.
        # For now, return placeholder boost
        return 2

    def _check_historical_patterns(self, issue_data):
        """
        Check similar past issues and their resolutions
        """
        # Query database for similar issues
        # This would be an actual DB query in production
        similar_issues = self._query_similar_issues(
            category=issue_data['category'],
            ward=issue_data['location']['ward']
        )

        boost = {}
        if similar_issues:
            # Calculate department success rate
            dept_counts = {}
            for issue in similar_issues:
                dept = issue['resolved_by_department']
                dept_counts[dept] = dept_counts.get(dept, 0) + 1

            # Boost most successful department
            total = len(similar_issues)
            for dept, count in dept_counts.items():
                if count / total > 0.8:  # 80% success rate
                    boost[dept] = 1

        return boost

    def _generate_reasoning(self, top_dept, keywords, context):
        """
        Generate human-readable explanation
        """
        dept_id, confidence = top_dept
        dept_name = self.departments[dept_id]['name']

        # Extract top keywords
        top_keywords = sorted(
            keywords.items(),
            key=lambda x: x[1],
            reverse=True
        )[:3]
        keyword_str = ', '.join([f"'{kw}'" for kw, _ in top_keywords])

        reasoning = (
            f"This issue has been categorized as a {dept_name} matter "
            f"with {confidence}% confidence. The analysis detected keywords "
            f"including {keyword_str}, which are primary indicators for this "
            f"department. "
        )

        if context:
            reasoning += "Additional context analysis confirmed this categorization. "

        return reasoning

    def _calculate_priority(self, issue_data, keywords):
        """
        Calculate priority score (1-100)
        """
        score = 50  # Base score

        # Factor 1: Safety risk (40% weight)
        safety_keywords = ['dangerous', 'urgent', 'emergency', 'injury', 'risk']
        safety_count = sum(1 for kw in safety_keywords if kw in keywords)
        score += min(40, safety_count * 10)

        # Factor 2: Location criticality (25% weight)
        critical_locations = ['school', 'hospital', 'main', 'highway']
        address = issue_data['location']['address'].lower()
        if any(loc in address for loc in critical_locations):
            score += 25

        # Factor 3: Severity keywords (20% weight)
        severity_keywords = ['large', 'major', 'severe', 'extensive']
        severity_count = sum(1 for kw in severity_keywords if kw in keywords)
        score += min(20, severity_count * 7)

        return min(100, score)

# Department Configuration Example
DEPARTMENTS_CONFIG = {
    'DEPT-001': {
        'name': 'Roads & Infrastructure',
        'keywords': {
            'pothole': 1.0,
            'road': 0.95,
            'asphalt': 0.9,
            'pavement': 0.85,
            'street': 0.8,
            'crack': 0.75,
        },
        'primary_categories': ['Potholes', 'Road Maintenance'],
        'avg_resolution_days': 4.2
    },
    'DEPT-002': {
        'name': 'Water & Sanitation',
        'keywords': {
            'water': 1.0,
            'leak': 0.95,
            'pipe': 0.9,
            'drain': 0.85,
            'sewage': 0.9,
        },
        'primary_categories': ['Water Leakage', 'Drainage Issues'],
        'avg_resolution_days': 3.5
    },
    # ... other departments
}
```

---

## 6. Performance Optimization Strategies

### 6.1 Frontend Optimization

```javascript
// 1. Code Splitting & Lazy Loading
const DashboardPage = lazy(() => import('./pages/Dashboard'));
const AnalyticsPage = lazy(() => import('./pages/Analytics'));
const IssueDetailModal = lazy(() => import('./components/IssueDetailModal'));

// 2. Memoization for Expensive Calculations
const MemoizedStatsCards = React.memo(({ stats }) => {
  return (
    <div className="stats-grid">
      <StatCard title="Total" value={stats.total} />
      <StatCard title="Open" value={stats.open} />
      <StatCard title="In Progress" value={stats.inProgress} />
      <StatCard title="Resolved" value={stats.resolved} />
    </div>
  );
}, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.stats) === JSON.stringify(nextProps.stats);
});

// 3. Virtualized Lists for Large Datasets
import { FixedSizeList as List } from 'react-window';

function IssuesList({ issues }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <IssueRow issue={issues[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={issues.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
}

// 4. Debounced Search
import { useDebouncedCallback } from 'use-debounce';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useDebouncedCallback(
    (value) => {
      fetchSearchResults(value);
    },
    500
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return <input value={searchTerm} onChange={handleChange} />;
}

// 5. Optimistic UI Updates
function updateIssueStatus(issueId, newStatus) {
  // Immediately update UI
  dispatch({
    type: 'UPDATE_ISSUE',
    payload: { id: issueId, status: newStatus }
  });

  // Send to server
  api.updateIssue(issueId, { status: newStatus })
    .catch((error) => {
      // Revert on failure
      dispatch({
        type: 'UPDATE_ISSUE',
        payload: { id: issueId, status: previousStatus }
      });
      toast.error('Update failed');
    });
}

// 6. Image Optimization
function OptimizedImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      srcSet={`
        ${src}?w=400 400w,
        ${src}?w=800 800w,
        ${src}?w=1200 1200w
      `}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
}
```

### 6.2 Backend Optimization

```javascript
// 1. Database Query Optimization

// Instead of N+1 queries:
// BAD
const issues = await db.issues.findAll();
for (let issue of issues) {
  issue.department = await db.departments.findById(issue.departmentId);
  issue.officer = await db.officers.findById(issue.officerId);
}

// GOOD - Use JOIN
const issues = await db.query(`
  SELECT
    i.*,
    d.name as department_name,
    o.name as officer_name,
    ai.confidence_score
  FROM issues i
  LEFT JOIN departments d ON i.assigned_department = d.id
  LEFT JOIN officers o ON i.assigned_officer = o.id
  LEFT JOIN ai_analysis ai ON i.id = ai.issue_id
  WHERE i.status IN ('open', 'in_progress')
  LIMIT 50
`);

// 2. Redis Caching
const redis = require('redis');
const client = redis.createClient();

async function getDashboardStats(filters) {
  const cacheKey = `stats:${JSON.stringify(filters)}`;

  // Check cache first
  const cached = await client.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Calculate stats
  const stats = await calculateStats(filters);

  // Cache for 5 minutes
  await client.setex(cacheKey, 300, JSON.stringify(stats));

  return stats;
}

// 3. Background Jobs for Heavy Processing
const Queue = require('bull');
const aiQueue = new Queue('ai-analysis');

// When issue is created
app.post('/api/issues', async (req, res) => {
  // Create issue first
  const issue = await db.issues.create(req.body);

  // Queue AI analysis (non-blocking)
  await aiQueue.add({
    issueId: issue.id,
    issueData: req.body
  });

  // Return immediately
  res.status(201).json({ issueId: issue.id });
});

// Worker process
aiQueue.process(async (job) => {
  const { issueId, issueData } = job.data;
  const analysis = await aiEngine.analyze(issueData);
  await db.aiAnalysis.create({
    issueId,
    ...analysis
  });
});

// 4. Database Connection Pooling
const { Pool } = require('pg');
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// 5. API Response Compression
const compression = require('compression');
app.use(compression());

// 6. Rate Limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

---

## 7. Deployment Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         PRODUCTION ARCHITECTURE                   │
└──────────────────────────────────────────────────────────────────┘

                         [Users (Citizens & Admins)]
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   CDN (CloudFront)   │
                         │   - Static Assets    │
                         │   - Image Cache      │
                         └──────────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Load Balancer      │
                         │   (Application LB)   │
                         └──────────────────────┘
                        ┌───────────┴───────────┐
                        │                       │
                        ▼                       ▼
            ┌───────────────────┐   ┌───────────────────┐
            │  Web Server 1     │   │  Web Server 2     │
            │  (EC2/Container)  │   │  (EC2/Container)  │
            │  - React App      │   │  - React App      │
            │  - SSR (if needed)│   │  - SSR (if needed)│
            └───────────────────┘   └───────────────────┘
                        │                       │
                        └───────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │  API Gateway (Kong)  │
                         │  - Authentication    │
                         │  - Rate Limiting     │
                         │  - Request Logging   │
                         └──────────────────────┘
                        ┌───────────┴───────────┐
                        │                       │
                        ▼                       ▼
            ┌───────────────────┐   ┌───────────────────┐
            │  API Server 1     │   │  API Server 2     │
            │  (Node.js/Express)│   │  (Node.js/Express)│
            └───────────────────┘   └───────────────────┘
                        │                       │
                        └───────────┬───────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌──────────────┐          ┌──────────────────┐      ┌───────────────────┐
│  PostgreSQL  │          │  Redis Cache     │      │  AI Service       │
│  (Primary)   │          │  - Session       │      │  (Python/FastAPI) │
│              │◄────────►│  - Stats Cache   │      │  - ML Models      │
│  PostgreSQL  │          │  - Rate Limits   │      │  - Image Analysis │
│  (Replica)   │          └──────────────────┘      └───────────────────┘
└──────────────┘                    │                         │
        │                           │                         │
        ▼                           ▼                         ▼
┌──────────────┐          ┌──────────────────┐      ┌───────────────────┐
│  Backup      │          │  Message Queue   │      │  Object Storage   │
│  (S3/GCS)    │          │  (RabbitMQ/SQS)  │      │  (S3/GCS)         │
└──────────────┘          │  - AI Jobs       │      │  - Images/Videos  │
                          │  - Notifications │      │  - Backups        │
                          └──────────────────┘      └───────────────────┘
                                    │
                                    ▼
                          ┌──────────────────┐
                          │  Worker Processes│
                          │  - AI Analysis   │
                          │  - Email Sending │
                          │  - Report Gen    │
                          └──────────────────┘

                                    │
                                    ▼
                          ┌──────────────────┐
                          │  WebSocket Server│
                          │  (Socket.io)     │
                          │  - Real-time     │
                          │    updates       │
                          └──────────────────┘

MONITORING & LOGGING:
├─ Application Monitoring (DataDog/New Relic)
├─ Error Tracking (Sentry)
├─ Log Aggregation (ELK Stack)
└─ Uptime Monitoring (Pingdom)
```

---

This technical implementation document provides the complete workflow details, design architecture, and implementation specifications for your Civic Issue Reporting & Management System. The document covers all aspects from end-to-end workflows to database schemas, API specifications, and deployment architecture.