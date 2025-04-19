
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function BackendInfo() {
  return (
    <Card className="mt-8 mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Backend Connection Information</CardTitle>
        <CardDescription>
          This is a placeholder for how the frontend would connect to the Spring Boot backend
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <p className="mb-4">
          In a complete implementation, this React frontend would connect to a Spring Boot backend with:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>REST API Endpoints:</strong> 
            <code className="ml-2 px-1 py-0.5 bg-gray-light rounded">GET /api/devices</code> - Get all devices
            <code className="ml-2 px-1 py-0.5 bg-gray-light rounded">GET /api/rooms</code> - Get all rooms
            <code className="ml-2 px-1 py-0.5 bg-gray-light rounded">PUT /api/devices/{"{id}"}/toggle</code> - Toggle device on/off
            <code className="ml-2 px-1 py-0.5 bg-gray-light rounded">PUT /api/devices/{"{id}"}/status</code> - Update device status
          </li>
          <li>
            <strong>Authentication:</strong> JWT-based auth with secure endpoints
          </li>
          <li>
            <strong>Real-time Updates:</strong> WebSocket connection for instant device state changes
          </li>
          <li>
            <strong>Database:</strong> MySQL with tables for users, devices, rooms, and device status
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
