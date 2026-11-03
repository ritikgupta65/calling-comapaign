import { ArrowLeft, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-shell min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your account details.</p>
        </div>

        <Card className="max-w-xl p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Ritik Gupta</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                guptaritik67856@gmail.com
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
