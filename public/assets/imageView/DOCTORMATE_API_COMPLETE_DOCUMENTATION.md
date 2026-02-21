# 📘 DoctorMate Backend API - Complete Technical Documentation

## 📋 Table of Contents
1. [Application Overview](#application-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Database Design](#database-design)
4. [Authentication & Authorization](#authentication--authorization)
5. [API Endpoints](#api-endpoints)
   - [Authentication Endpoints](#authentication-endpoints)
   - [Profile Management](#profile-management)
   - [Appointment Management](#appointment-management)
   - [Medical Records](#medical-records)
   - [Diagnosis Management](#diagnosis-management)
   - [Prescription Management](#prescription-management)
   - [Medical Images](#medical-images)
   - [Doctor Reviews](#doctor-reviews)
   - [Doctor Search & Specialties](#doctor-search--specialties)
   - [Notification System](#notification-system)
   - [Device Token Management](#device-token-management)
   - [Payment Management](#payment-management)
   - [Admin Dashboard](#admin-dashboard)
   - [Owner Management](#owner-management)
   - [Doctor Dashboard](#doctor-dashboard)
6. [Real-Time Features (SignalR)](#real-time-features-signalr)
7. [Background Services](#background-services)
8. [External Integrations](#external-integrations)
9. [Error Handling](#error-handling)
10. [Business Rules & Workflows](#business-rules--workflows)

---

## 📖 Application Overview

**DoctorMate** is a comprehensive healthcare management system that connects patients with doctors, manages appointments, medical records, prescriptions, and facilitates complete healthcare workflows.

### Key Features:
- ✅ Patient-Doctor appointment booking system
- ✅ Complete medical record management (EHR)
- ✅ Prescription management with medication tracking
- ✅ Medical image upload and PACS integration (Orthanc)
- ✅ Doctor review and rating system
- ✅ OpenMRS EMR integration for clinical data
- ✅ Real-time email notifications (OTP, appointments)
- ✅ **Unified Notification System** (FCM Push + SignalR Real-Time + REST API)
- ✅ **Real-Time SignalR Hub** for Doctor Web Dashboard
- ✅ **FCM Push Notifications** for Mobile (Patient & Doctor)
- ✅ **Background Services** (Reminders, Cleanup, Retry Logic)
- ✅ Role-based access control (Patient, Doctor, Admin, Owner)
- ✅ Profile completion workflow with verification
- ✅ **Admin Dashboard** with specialty management, user monitoring, system logs
- ✅ **Owner Dashboard** with admin account management
- ✅ **Doctor Dashboard** with stats and insights
- ✅ System logging and audit trails
- ✅ **Payment Management** with transaction tracking
- ✅ Real-time chat messaging
- ✅ **Automated Appointment Reminders** (24h & 1h before)

---

## 🏗️ Architecture & Technology Stack

### **Clean Architecture Pattern**
```
doctor.APIs/          → Presentation Layer (Controllers, Middleware, DTOs)
doctor.Service/       → Business Logic Layer (Services, Implementations)
doctor.Core/          → Domain Layer (Entities, Interfaces, Enums)
doctor.Repository/    → Data Access Layer (DbContext, Configurations, Migrations)
```

### **Technologies**
- **Framework:** ASP.NET Core 8.0 Web API
- **ORM:** Entity Framework Core 8
- **Database:** Microsoft SQL Server
- **Authentication:** JWT Bearer Tokens
- **Password Hashing:** BCrypt.NET
- **Image Storage:** Cloudinary
- **PACS Integration:** Orthanc (DICOM medical imaging)
- **EMR Integration:** OpenMRS REST API
- **Email Service:** SMTP (Gmail)
- **OTP:** Separate OTP database with expiration tracking
- **Push Notifications:** Firebase Cloud Messaging (FCM)
- **Real-Time Communication:** SignalR (WebSocket)
- **Background Jobs:** IHostedService (AppointmentReminder, NotificationCleanup, FCMRetry)

---

## 🗄️ Database Design

### **Core Tables**

#### **1. Users Table** (`AspNetUsers`)
Primary identity table for all users.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `FullName` | string | User's full name |
| `Email` | string | Email address (unique) |
| `Phone` / `PhoneNumber` | string | Contact number |
| `PasswordHash` | string | BCrypt hashed password |
| `Role` | string | `Patient`, `Doctor`, `Admin`, or `Owner` |
| `IsActive` | bool | Account status |
| `IsVerified` | bool | Email verification status |
| `IsCompletedProfile` | bool | Profile completion flag |
| `MustChangePassword` | bool | Force password change on next login (Admin/Owner feature) |
| `LastLogin` | DateTime? | Last login timestamp |
| `ImageUrl` | string | Profile picture URL (Cloudinary) |
| `CreatedAt` | DateTime | Registration timestamp |
| `UpdatedAt` | DateTime? | Last update timestamp |

**Relationships:**
- One-to-One with `Patient`, `Doctor`, or `Admin` (based on role)
- One-to-Many with `Notifications`
- One-to-Many with `AuditLogs`
- One-to-Many with `SystemLogs`
- One-to-Many with `ChatMessages` (as Sender or Receiver)

---

#### **2. Patients Table** (`patients`)
Extended profile for patients.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `UserId` | GUID | FK to Users (unique) |
| `BirthDate` | DateTime? | Date of birth |
| `Gender` | string | Male/Female/Other |
| `Address` | string | Residential address |
| `BloodType` | string | A+, B+, O-, etc. |
| `EmergencyContact` | string | JSON string with contact info |
| `OpenmrsPatientUuid` | string | OpenMRS patient UUID |
| `CreatedAt` | DateTime | Record creation time |
| `UpdatedAt` | DateTime? | Last update time |

**Relationships:**
- One-to-One with `User` (via `UserId`)
- One-to-Many with `Appointments`
- One-to-Many with `MedicalRecords`
- One-to-Many with `DoctorReviews`

---

#### **3. Doctors Table** (`doctors`)
Extended profile for doctors.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `UserId` | GUID | FK to Users (unique) |
| `SpecialtyId` | GUID? | FK to Specialties |
| `Specialty` | string | Specialty name (deprecated) |
| `Qualifications` | text | Medical degrees and certifications |
| `LicenseNumber` | string | Medical license number (unique) |
| `ConsultationFee` | decimal(10,2) | Fee per consultation |
| `Address` | string | Clinic/hospital address |
| `StartWorkingTime` | TimeSpan | Start of working hours (e.g., 09:00) |
| `EndWorkingTime` | TimeSpan | End of working hours (e.g., 17:00) |
| `AverageRating` | decimal(3,2) | Average rating (1.00 - 5.00) |
| `TotalReviews` | int | Total number of reviews |
| `OpenmrsProviderUuid` | string | OpenMRS provider UUID |
| `CreatedAt` | DateTime | Record creation time |
| `UpdatedAt` | DateTime? | Last update time |

**Relationships:**
- One-to-One with `User` (via `UserId`)
- Many-to-One with `Specialty`
- One-to-Many with `Appointments`
- One-to-Many with `DoctorWorkingDays`
- One-to-Many with `DoctorReviews`
- One-to-Many with `Diagnoses` (via `DiagnosedBy`)

---

#### **4. Specialties Table** (`specialties`)
Medical specialties catalog.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `Name` | string | Specialty name (e.g., "Cardiology") |
| `Description` | text | Description of specialty |
| `ImageUrl` | string | Icon/image for specialty |
| `CreatedAt` | DateTime | Record creation time |

**Relationships:**
- One-to-Many with `Doctors`

---

#### **5. DoctorWorkingDays Table** (`doctor_working_days`)
Tracks which days doctors are available.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `DoctorId` | GUID | FK to Doctors |
| `Day` | enum | Sunday, Monday, ..., Saturday |

**Relationships:**
- Many-to-One with `Doctor`

---

#### **6. Appointments Table** (`appointments`)
Booking records between patients and doctors.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `PatientId` | GUID | FK to Patients |
| `DoctorId` | GUID | FK to Doctors |
| `ScheduledStart` | DateTime | Appointment start time |
| `ScheduledEnd` | DateTime? | Appointment end time |
| `Status` | string | `pending`, `scheduled`, `confirmed`, `completed`, `cancelled`, `no_show` |
| `Reason` | string | Reason for visit |
| `AppointmentType` | string | `in_person` or `online` |
| `SyncStatus` | string | OpenMRS sync status: `pending`, `synced`, `failed` |
| `CanceledAt` | DateTime? | Cancellation timestamp |
| `CanceledBy` | GUID? | User who canceled |
| `OpenmrsAppointmentUuid` | string | OpenMRS appointment UUID |
| `CreatedAt` | DateTime | Booking time |
| `UpdatedAt` | DateTime? | Last update time |

**Relationships:**
- Many-to-One with `Patient`
- Many-to-One with `Doctor`
- One-to-Many with `MedicalRecords`
- One-to-Many with `Diagnoses`
- One-to-Many with `MedicalImages`

**Business Rules:**
- Patient cannot book multiple active appointments with same doctor
- Minimum 1-hour gap between appointments on same day (different doctors)
- Cannot book appointments in the past
- Doctor must be available on selected day/time
- Appointments are 15 minutes with 15-minute buffer

---

#### **7. MedicalRecords Table** (`medical_records`)
Electronic Health Records (EHR) for patients.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `PatientId` | GUID | FK to Patients |
| `DoctorId` | GUID? | FK to Doctors (who created record) |
| `Title` | string | Record title |
| `Description` | text | Detailed medical notes |
| `RecordType` | string | `diagnosis`, `lab_result`, `imaging` |
| `Status` | string | Record status |
| `RecordedBy` | GUID? | User ID who recorded |
| `RecordedAt` | DateTime | Timestamp of record creation |
| `OpenmrsEncounterUuid` | string | OpenMRS encounter UUID |
| `CreatedAt` | DateTime | Creation timestamp |
| `UpdatedAt` | DateTime? | Last update timestamp |

**Relationships:**
- Many-to-One with `Patient`
- Many-to-One with `Doctor`
- One-to-Many with `Diagnoses`

---

#### **8. Diagnoses Table** (`diagnoses`)
Medical diagnoses for patients.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `MedicalRecordId` | GUID | FK to MedicalRecords |
| `AppointmentId` | GUID? | FK to Appointments |
| `DiagnosedBy` | GUID | FK to Users (doctor who diagnosed) |
| `Description` (DiagnosisText) | string(2000) | Diagnosis description |
| `IcdCode` | string(50) | ICD-10 diagnosis code |
| `Severity` | string(100) | `mild`, `moderate`, `severe` |
| `OpenmrsConditionUuid` | string | OpenMRS condition UUID |
| `CreatedAt` | DateTime | Diagnosis timestamp |
| `UpdatedAt` | DateTime? | Last update timestamp |

**Relationships:**
- Many-to-One with `MedicalRecord`
- Many-to-One with `Appointment`
- Many-to-One with `User` (DiagnosedBy)
- One-to-One with `Prescription`

---

#### **9. Prescriptions Table** (`prescriptions`)
Medical prescriptions for patients.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `DiagnosisId` | GUID | FK to Diagnoses |
| `DoctorId` | GUID | FK to Doctors |
| `PatientId` | GUID | FK to Patients |
| `PrescribedDate` | DateTime | Date prescription was written |
| `ValidUntil` | DateTime? | Expiration date |
| `Status` | string | `active`, `expired`, `completed` |
| `Notes` | text | Additional instructions |
| `OpenmrsOrderUuid` | string | OpenMRS order UUID |
| `CreatedAt` | DateTime | Creation timestamp |
| `UpdatedAt` | DateTime? | Last update timestamp |

**Relationships:**
- One-to-One with `Diagnosis`
- Many-to-One with `Doctor`
- Many-to-One with `Patient`
- One-to-Many with `PrescriptionMedications`

---

#### **10. PrescriptionMedications Table** (`prescription_medications`)
Individual medications within a prescription.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `PrescriptionId` | GUID | FK to Prescriptions |
| `DrugName` | string | Medication name |
| `Dosage` | string | Dosage (e.g., "500mg") |
| `Frequency` | string | How often (e.g., "Every 6 hours") |
| `DurationDays` | int | Duration in days |
| `Instructions` | string | Special instructions |
| `Quantity` | int | Total quantity |

**Relationships:**
- Many-to-One with `Prescription`

---

#### **11. MedicalImages Table** (`medical_images`)
DICOM and medical imaging records.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `AppointmentId` | GUID? | FK to Appointments |
| `PatientId` | GUID | FK to Patients |
| `UploadedBy` | GUID | FK to Users (doctor/admin) |
| `ImageType` | string | `X-Ray`, `CT Scan`, `MRI`, `Ultrasound` |
| `FileName` | string | Original file name |
| `FileUrl` | string | Orthanc/PACS URL |
| `OrthancInstanceId` | string | Orthanc instance ID |
| `StudyDate` | DateTime? | Date of study |
| `Tags` | string | JSON array of tags |
| `Notes` | text | Doctor's notes |
| `Status` | string | `pending`, `reviewed`, `archived` |
| `CreatedAt` | DateTime | Upload timestamp |
| `UpdatedAt` | DateTime? | Last update timestamp |

**Relationships:**
- Many-to-One with `Appointment`
- Many-to-One with `Patient`
- Many-to-One with `User` (UploadedBy)

---

#### **12. DoctorReviews Table** (`doctor_reviews`)
Patient reviews and ratings for doctors.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `AppointmentId` | GUID | FK to Appointments (unique) |
| `DoctorId` | GUID | FK to Doctors |
| `PatientId` | GUID | FK to Patients |
| `Rating` | int | Rating (1-5 stars) |
| `Comment` | text | Review text |
| `CreatedAt` | DateTime | Review timestamp |
| `UpdatedAt` | DateTime? | Last update timestamp |

**Relationships:**
- One-to-One with `Appointment`
- Many-to-One with `Doctor`
- Many-to-One with `Patient`

**Business Rules:**
- One review per appointment
- Only patients can create reviews
- Appointment must be `completed`
- Automatically updates doctor's `AverageRating` and `TotalReviews`

---

#### **13. OTP Table** (Separate Database: `OtpDbContext`)
One-Time Password records for email verification and password reset.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | int | Primary key (auto-increment) |
| `Email` | string | User email address |
| `OtpCode` | string | 6-digit OTP code |
| `Purpose` | string | `AccountVerification` or `PasswordReset` |
| `IsUsed` | bool | Whether OTP has been used |
| `ExpiresAt` | DateTime | Expiration time (5 minutes) |
| `CreatedAt` | DateTime | Creation timestamp |

**Business Rules:**
- OTP expires after 5 minutes
- OTP can only be used once
- Maximum 3 attempts before resending

---

#### **14. Admins Table** (`Admins`)
Extended profile for admin users.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `UserId` | GUID | FK to Users (unique) |
| `Department` | string | Department (e.g., IT, HR, Operations) |
| `Notes` | string? | Additional notes about admin |
| `CreatedByOwnerId` | GUID? | FK to Users (Owner who created this admin) |
| `CreatedAt` | DateTime | Record creation time |
| `UpdatedAt` | DateTime? | Last update time |

**Relationships:**
- One-to-One with `User` (via `UserId`)
- Many-to-One with `User` (CreatedByOwner)

---

#### **15. SystemLogs Table** (`SystemLogs`)
System-level logs for monitoring and auditing.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `LogType` | string | Type: `LoginFailure`, `PaymentError`, `PACSError`, `AIError`, `IntegrationError` |
| `Message` | string | Log message |
| `UserId` | GUID? | FK to Users (optional) |
| `UserEmail` | string? | User email (for failed logins) |
| `IpAddress` | string? | IP address |
| `Details` | string? | Additional details (JSON) |
| `Severity` | string | `Info`, `Warning`, `Error`, `Critical` |
| `CreatedAt` | DateTime | Log timestamp |

**Relationships:**
- Many-to-One with `User` (optional)

**Business Rules:**
- High-level logs only (no stack traces)
- Used for admin monitoring

---

#### **16. Payments Table** (`payments`)
**Payment transaction tracking for appointments.**

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `AppointmentId` | GUID | FK to Appointments |
| `PatientId` | GUID | FK to Patients |
| `Amount` | decimal(10,2) | Payment amount |
| `Currency` | string(3) | Currency code (default: USD) |
| `Method` | string(50) | Payment method (card, cash, insurance, etc.) |
| `Status` | string | `pending`, `success`, `failed`, `refunded` |
| `TransactionRef` | string(100)? | External payment gateway transaction reference |
| `PaidAt` | DateTime? | Payment completion time |
| `CreatedAt` | DateTime | Record creation time |
| `UpdatedAt` | DateTime? | Last update time |

**Relationships:**
- Many-to-One with `Appointment`
- Many-to-One with `Patient`

**Business Rules:**
- One payment per appointment
- Only patients can create payments
- Payment notifications sent on status change:
  - **Success:** Patient & Doctor both notified
  - **Failed:** Patient notified only
- Payment status can be updated by admin/owner
- Supports webhook integration for payment gateways
- Can be refunded (status → `refunded`)

---

#### **17. Notifications Table** (`notifications`)
**Unified notification system supporting FCM Push + SignalR Real-Time.**

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `UserId` | GUID | FK to Users |
| `Title` | string(200) | Notification title |
| `Message` | string(max) | Notification message body |
| `Type` | enum (NotificationType) | Notification category (see NotificationType enum below) |
| `Metadata` | string(max) | Additional data as JSON (appointmentId, doctorName, etc.) |
| `IsRead` | bool | Read status (default: false) |
| `CreatedAt` | DateTime | Notification timestamp (indexed) |

**NotificationType Enum:**
```csharp
public enum NotificationType
{
    AppointmentCreated = 1,      // Doctor receives when patient books
    AppointmentConfirmed = 2,    // Patient receives when doctor confirms
    AppointmentCancelled = 3,    // Both receive when cancelled
    AppointmentReminder = 4,     // Both receive before appointment (24h & 1h)
    DiagnosisAdded = 10,         // Patient receives when diagnosis created
    PrescriptionCreated = 11,    // Patient receives when prescription created
    MedicalImageUploaded = 12,   // Patient receives when image uploaded
    PaymentSuccess = 20,         // Patient & Doctor receive on successful payment
    PaymentFailed = 21,          // Patient receives on failed payment
    NewChatMessage = 30,         // Receiver gets message notification
    SystemAlert = 100            // System-wide alerts
}
```

**Relationships:**
- Many-to-One with `User`

**Indexes:**
- `UserId` (for fast user notifications query)
- `IsRead` (for unread count)
- `CreatedAt` (for sorting)
- `Type` (for filtering by type)

**Business Rules:**
- Notifications are stored in DB (persistent)
- Delivered via multiple channels:
  - **Patient (Mobile):** FCM Push only
  - **Doctor (Mobile):** FCM Push only
  - **Doctor (Web):** SignalR Real-Time only
- Unread notifications never deleted (retention: infinite)
- Read notifications deleted after 90 days (background job)
- Supports pagination (20 items per page)

---

#### **18. DeviceTokens Table** (`device_tokens`)
**FCM device token management for push notifications.**

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `UserId` | GUID | FK to Users |
| `Token` | string(500) | FCM device token (unique) |
| `DeviceType` | string(50) | `android`, `ios`, `web` |
| `DeviceName` | string(200) | Device name/model |
| `IsActive` | bool | Token status (default: true) |
| `LastUsedAt` | DateTime | Last successful push (updated on delivery) |
| `CreatedAt` | DateTime | Token registration time |

**Relationships:**
- Many-to-One with `User`

**Indexes:**
- `UserId` (for user's devices)
- `Token` (unique constraint)
- `IsActive` (for active tokens only)
- `LastUsedAt` (for cleanup)

**Business Rules:**
- One user → multiple device tokens (multi-device support)
- Token uniqueness enforced (unique index)
- Invalid/unregistered tokens deactivated automatically (FCM error handling)
- Inactive tokens deleted after 30 days (background job)
- Re-registering existing token updates `LastUsedAt`

---

#### **19. ChatMessages Table** (`chat_messages`)
Real-time chat between users.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `SenderId` | GUID | FK to Users (sender) |
| `ReceiverId` | GUID | FK to Users (receiver) |
| `AppointmentId` | GUID? | FK to Appointments (optional) |
| `Message` | string | Chat message content |
| `SentAt` | DateTime | Message timestamp |

**Relationships:**
- Many-to-One with `User` (Sender)
- Many-to-One with `User` (Receiver)
- Many-to-One with `Appointment` (optional)

---

#### **19. AuditLogs Table** (`audit_logs`)
Audit trail for user actions.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `UserId` | GUID | FK to Users |
| `Action` | string | Action performed |
| `Entity` | string | Entity type affected |
| `EntityId` | GUID? | ID of affected entity |
| `Status` | string | Action status |
| `LogTime` | DateTime | Action timestamp |
| `Response` | string? | Response data (JSON) |

**Relationships:**
- Many-to-One with `User`

---

#### **20. IntegrationLogs Table** (`integration_logs`)
OpenMRS integration synchronization logs.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | GUID | Primary key |
| `Endpoint` | string | API endpoint called |
| `Method` | string | HTTP method |
| `EntityType` | string? | `Patient`, `Doctor`, `Appointment`, etc. |
| `EntityId` | GUID? | Local entity ID |
| `Operation` | string | `Create`, `Update`, `Delete` |
| `Status` | string | `Success`, `Failed`, `Pending` |
| `OpenMrsUuid` | string? | OpenMRS UUID (if successful) |
| `ErrorMessage` | string? | Error details |
| `RequestPayload` | string? | Request JSON |
| `ResponsePayload` | string? | Response JSON |
| `StatusCode` | int | HTTP status code |
| `Success` | bool | Success flag |
| `CreatedAt` | DateTime | Log creation time |
| `CompletedAt` | DateTime? | Completion time |
| `RetryCount` | int | Number of retry attempts |
| `NextRetryAt` | DateTime? | Next retry scheduled time |

**Business Rules:**
- Tracks OpenMRS sync operations
- Supports retry mechanism
- Stores request/response for debugging

---

### **Entity Relationship Diagram (Simplified)**

```
┌─────────────┐
│    User     │
│  (Identity) │
└──────┬──────┘
       │
       ├──────────────────────────┐
       │                          │
┌──────▼──────┐            ┌─────▼──────┐
│   Patient   │            │   Doctor   │
└──────┬──────┘            └─────┬──────┘
       │                          │
       │    ┌──────────────┐      │
       └────►  Appointment ◄──────┘
            └──────┬───────┘
                   │
       ┌───────────┼────────────┬─────────────┐
       │           │            │             │
┌──────▼───────┐ ┌▼─────────┐ ┌▼─────────┐  ┌▼──────────┐
│MedicalRecord │ │Diagnosis │ │ Medical  │  │  Doctor   │
└──────────────┘ └───┬──────┘ │  Image   │  │  Review   │
                     │        └──────────┘  └───────────┘
              ┌──────▼───────┐
              │ Prescription │
              └──────┬───────┘
                     │
           ┌─────────▼────────────┐
           │ PrescriptionMedication│
           └──────────────────────┘
```

---

## 🔐 Authentication & Authorization

### **JWT Token Structure**

**Token Claims:**
```json
{
  "sub": "user-guid",
  "role": "Patient|Doctor|Admin",
  "email": "user@example.com",
  "PhoneNumber": "+1234567890",
  "nbf": 1234567890,
  "exp": 1234567890,
  "iat": 1234567890,
  "iss": "DoctorMateAPI",
  "aud": "DoctorMateClient"
}
```

**Token Configuration:**
- **Algorithm:** HMAC-SHA256
- **Validity:** 7 days
- **Header:** `Authorization: Bearer <token>`

### **Role-Based Access Control**

| Role | Permissions |
|------|-------------|
| **Patient** | - View/edit own profile<br>- Book appointments<br>- View own medical records<br>- View own prescriptions<br>- Submit doctor reviews<br>- View own appointments<br>- Receive notifications<br>- Chat with doctors |
| **Doctor** | - View/edit own profile<br>- View assigned appointments<br>- Create diagnoses<br>- Create prescriptions<br>- Create medical records<br>- Upload medical images<br>- Update appointment status<br>- View doctor dashboard with stats<br>- Chat with patients |
| **Admin** | - Manage specialties (CRUD operations)<br>- View user list (non-medical data)<br>- View system logs<br>- Monitor system health<br>- ❌ No access to medical records/diagnoses/prescriptions<br>- ❌ Cannot create/manage other admins |
| **Owner** | - All Admin permissions<br>- Create/manage Admin accounts<br>- Deactivate/reactivate Admins<br>- Full system oversight<br>- Manage admin departments |

---

## 📡 API Endpoints

### **Base URL:** `http://localhost:7200` (Development)

### **Common Response Format**
```json
{
  "code": 200,
  "message": "Success message",
  "data": { }
}
```

---

## 1️⃣ Authentication Endpoints

### 🟢 **POST** `/api/Register`
Register a new user (Patient or Doctor).

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "password": "SecurePass123",
  "role": "Patient",
  "fullName": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "code": 201,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "guid",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "role": "Patient",
      "isVerified": false,
      "isCompletedProfile": false
    }
  }
}
```

---

### 🟢 **POST** `/api/Login`
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "emailOrPhone": "john.doe@example.com",
  "password": "SecurePass123"
}
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "guid",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "role": "Patient",
      "isVerified": true,
      "isCompletedProfile": true
    }
  }
}
```

---

### 🟢 **POST** `/api/Otp/send`
Send OTP to user's email.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "isForgetPass": false
}
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "OTP sent successfully to your email address.",
  "data": null
}
```

---

### 🟢 **POST** `/api/Otp/verify`
Verify OTP code.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "otpCode": "123456",
  "isForgetPass": false
}
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Account verified successfully. Welcome to Doctor Mate!",
  "data": {
    "email": "john.doe@example.com",
    "userId": "guid",
    "isVerified": true,
    "purpose": "AccountVerification"
  }
}
```

---

### 🟢 **POST** `/api/CompleteProfile/complete`
Complete user profile after verification.

**Authorization:** Required (JWT Token)  
**Roles:** Patient, Doctor

**Request Body (Patient):**
```json
{
  "birthDate": "1990-05-15T00:00:00Z",
  "gender": "Male",
  "address": "123 Main St, New York, NY",
  "bloodType": "A+"
}
```

**Request Body (Doctor):**
```json
{
  "specialtyId": "guid",
  "qualifications": "MD, MBBS, Cardiology Specialist",
  "licenseNumber": "MED-12345",
  "consultationFee": 150.00,
  "address": "456 Hospital Ave, Los Angeles, CA",
  "startWorkingTime": "09:00:00",
  "endWorkingTime": "17:00:00",
  "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
}
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Profile completed successfully.",
  "data": {
    "isCompletedProfile": true
  }
}
```

---

## 2️⃣ Profile Management

### 🟢 **GET** `/api/Profile_Management`
Get current user's profile.

**Authorization:** Required

**Response (200 OK) - Patient:**
```json
{
  "code": 200,
  "message": "Patient profile found",
  "data": {
    "id": "guid",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "imageUrl": "https://cloudinary.com/...",
    "role": "Patient",
    "address": "123 Main St",
    "birthDate": "1990-05-15T00:00:00Z",
    "gender": "Male",
    "bloodType": "A+"
  }
}
```

---

### 🟡 **PUT** `/api/Profile_Management/update`
Update user profile.

**Authorization:** Required  
**Content-Type:** `multipart/form-data`

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Profile updated successfully.",
  "data": {
    "fullName": "John Doe Updated",
    "phone": "+9876543210",
    "imageUrl": "https://cloudinary.com/...",
    "role": "Patient"
  }
}
```

---

## 3️⃣ Appointment Management

### 🟢 **POST** `/api/appointments`
Book a new appointment (Patient only).

**Authorization:** Required  
**Roles:** Patient

**Request Body:**
```json
{
  "doctorId": "guid",
  "appointmentDate": "2024-02-15",
  "appointmentTime": "14:30:00",
  "reason": "Regular checkup",
  "appointmentType": "in_person"
}
```

**Response (201 Created):**
```json
{
  "code": 201,
  "message": "Appointment booked successfully",
  "data": {
    "appointment": {
      "id": "guid",
      "appointmentDate": "2024-02-15",
      "appointmentTime": "14:30:00",
      "status": "Scheduled",
      "doctor": {
        "doctorName": "Dr. Jane Smith",
        "specialtyName": "Cardiology",
        "consultationFee": 150.00
      }
    }
  }
}
```

---

### 🟢 **GET** `/api/appointments/patient`
Get patient's appointments.

**Authorization:** Required  
**Roles:** Patient

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `limit` (int): Items per page (default: 10)

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Patient appointments retrieved successfully",
  "data": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 25,
      "totalPages": 3
    },
    "appointments": []
  }
}
```

---

### 🟢 **GET** `/api/appointments/Doctor`
Get doctor's appointments.

**Authorization:** Required  
**Roles:** Doctor

---

### 🟡 **PUT** `/api/appointments/{appointmentId}/status`
Update appointment status.

**Authorization:** Required  
**Roles:** Doctor, Patient

**Request Body:**
```json
{
  "status": "confirmed"
}
```

---

### 🔴 **DELETE** `/api/appointments/{appointmentId}`
Cancel an appointment.

**Authorization:** Required

---

## 4️⃣ Doctor Search & Specialties

### 🟢 **GET** `/api/Specialties`
Get all medical specialties.

**Authorization:** Required

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Specialties retrieved successfully",
  "data": [
    {
      "id": "guid",
      "name": "Cardiology",
      "description": "Heart specialists",
      "imageUrl": "https://..."
    }
  ]
}
```

---

### 🟢 **GET** `/api/Specialties/{specialtyId}/doctors`
Get doctors by specialty.

**Query Parameters:**
- `page`, `limit`

---

### 🟢 **GET** `/api/Doctors/Search`
Search doctors with filters.

**Query Parameters:**
- `name`, `specialtyId`, `minFee`, `maxFee`, `minRating`, `page`, `limit`

---

### 🟢 **GET** `/api/Doctors/{doctorId}/available-slots`
Get available time slots.

**Query Parameters:**
- `date` (DateTime): Date to check

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Available slots",
  "data": {
    "doctorId": "guid",
    "date": "2024-02-15",
    "slotDuration": 15,
    "buffer": 15,
    "slots": [
      "2024-02-15T09:00:00Z",
      "2024-02-15T09:30:00Z"
    ],
    "isWorkingDay": true
  }
}
```

---

## 5️⃣ Medical Records

### 🟢 **POST** `/api/records`
Create a new medical record.

**Authorization:** Required  
**Roles:** Doctor

**Request Body:**
```json
{
  "patientId": "guid",
  "title": "Annual Physical Examination",
  "description": "Complete examination results...",
  "recordType": "diagnosis"
}
```

---

### 🟢 **GET** `/api/records/patient/{patientId}`
Get patient's medical records (Doctor).

**Authorization:** Required  
**Roles:** Doctor

---

### 🟢 **GET** `/api/records/patient`
Get my medical records (Patient).

**Authorization:** Required  
**Roles:** Patient

---

## 6️⃣ Diagnosis Management

### 🟢 **POST** `/api/Diagnoses`
Create a new diagnosis.

**Authorization:** Required  
**Roles:** Doctor

**Request Body:**
```json
{
  "medicalRecordId": "guid",
  "appointmentId": "guid",
  "description": "Type 2 Diabetes Mellitus",
  "icdCode": "E11",
  "severity": "moderate"
}
```

---

### 🟢 **GET** `/api/Diagnoses/{id}`
Get diagnosis by ID.

---

### 🟢 **GET** `/api/Diagnoses/medical-record/{medicalRecordId}`
Get diagnoses for medical record.

---

### 🟢 **GET** `/api/Diagnoses/patient/{patientId}`
Get patient diagnoses.

---

### 🟢 **GET** `/api/Diagnoses/my-diagnoses`
Get diagnoses created by current doctor.

**Authorization:** Required  
**Roles:** Doctor

---

## 7️⃣ Prescription Management

### 🟢 **POST** `/api/prescriptions`
Create prescription with medications.

**Authorization:** Required  
**Roles:** Doctor

**Request Body:**
```json
{
  "diagnosisId": "guid",
  "medications": [
    {
      "drugName": "Metformin",
      "dosage": "500mg",
      "frequency": "Twice daily",
      "durationDays": 30,
      "instructions": "Take with food",
      "quantity": 60
    }
  ]
}
```

---

### 🟢 **GET** `/api/prescriptions`
Get prescription by appointment ID.

**Query Parameters:**
- `appointment_id` (GUID, required)

---

### 🟢 **GET** `/api/prescriptions/{id}`
Get prescription by ID.

---

### 🟢 **GET** `/api/prescriptions/diagnosis/{diagnosisId}`
Get prescription by diagnosis.

---

### 🟢 **GET** `/api/prescriptions/diagnosis/{diagnosisId}/can-create`
Check if prescription can be created.

**Authorization:** Required  
**Roles:** Doctor

---

## 8️⃣ Medical Images

### 🟢 **POST** `/api/medical-images`
Upload medical image to PACS.

**Authorization:** Required  
**Roles:** Doctor

**Content-Type:** `multipart/form-data`

**Request Body:**
```
appointmentId: guid
imageType: "X-Ray"
imageFile: <DICOM file>
studyDate: "2024-01-27"
tags: ["chest", "follow-up"]
notes: "Follow-up chest X-ray"
```

---

### 🟢 **GET** `/api/medical-images`
Get images for appointment.

**Query Parameters:**
- `appointmentId` (GUID, required)

---

### 🟢 **GET** `/api/medical-images/{id}`
Get image by ID.

---

### 🟢 **GET** `/api/medical-images/{id}/viewer-url`
Get OHIF/Orthanc viewer URL.

---

### 🟡 **PUT** `/api/medical-images/{id}`
Update image metadata.

**Authorization:** Required  
**Roles:** Doctor

---

### 🟢 **GET** `/api/medical-images/{id}/pacs-metadata`
Get PACS metadata.

**Authorization:** Required  
**Roles:** Doctor

---

### 🔴 **DELETE** `/api/medical-images/{id}`
Delete medical image.

---

## 9️⃣ Doctor Reviews

### 🟢 **POST** `/api/doctor-reviews`
Create review for doctor.

**Authorization:** Required  
**Roles:** Patient

**Request Body:**
```json
{
  "appointmentId": "guid",
  "rating": 5,
  "comment": "Excellent doctor!"
}
```

---

### 🟡 **PUT** `/api/doctor-reviews/{id}`
Update review.

**Authorization:** Required  
**Roles:** Patient

---

### 🔴 **DELETE** `/api/doctor-reviews/{id}`
Delete review.

---

### 🟢 **GET** `/api/doctor-reviews/{id}`
Get review by ID.

---

### 🟢 **GET** `/api/doctor-reviews/doctor/{doctorId}`
Get reviews for doctor (Public).

**Authorization:** None

---

### 🟢 **GET** `/api/doctor-reviews/patient/my-reviews`
Get my reviews.

**Authorization:** Required  
**Roles:** Patient

---

## 🔧 External Integrations

### **OpenMRS EMR Integration**
- Syncs Patients, Doctors, Appointments, Diagnoses, Prescriptions
- Non-blocking background sync
- Stores OpenMRS UUIDs

### **Orthanc PACS Integration**
- DICOM image storage
- Web viewer URLs
- Metadata retrieval

### **Cloudinary**
- Profile image storage

### **SMTP Email**
- OTP verification
- Appointment notifications

---

## 📊 Business Rules

### **Appointment Booking:**
1. ❌ Cannot have multiple active appointments with same doctor
2. ❌ Cannot book in the past
3. ❌ Must be within working hours
4. ✅ 15-minute slots with 15-minute buffer
5. ✅ Minimum 1-hour gap between appointments (same day)

### **Prescriptions:**
- One prescription per diagnosis
- Appointment must be completed
- Only doctor can create

### **Reviews:**
- One review per appointment
- Appointment must be completed
- Only patient can create
- Auto-updates doctor rating

---

## ⚠️ Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

**Documentation Version:** 1.0  
**Last Updated:** January 2024  
**API Base URL:** `http://localhost:7200`

**End of Documentation**
