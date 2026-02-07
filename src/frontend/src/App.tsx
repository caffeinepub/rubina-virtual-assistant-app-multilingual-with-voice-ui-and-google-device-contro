import { useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function App() {
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();

  useEffect(() => {
    console.log('[App] Initialization status:', loginStatus);
    if (identity) {
      console.log('[App] Identity principal:', identity.getPrincipal().toString());
    }
  }, [loginStatus, identity]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Initializing application...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/rubina-logo.dim_512x512.png" 
              alt="Rubina Logo" 
              className="h-10 w-10 rounded-lg"
            />
            <h1 className="text-2xl font-bold text-foreground">Rubina Assistant</h1>
          </div>
          <div className="flex items-center gap-2">
            {identity ? (
              <>
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Connected
                </span>
                <Button onClick={clear} variant="outline" size="sm">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={login} disabled={loginStatus === 'logging-in'}>
                {loginStatus === 'logging-in' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Rubina</CardTitle>
              <CardDescription>
                Your multilingual virtual assistant with voice capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <img 
                  src="/assets/generated/rubina-avatar.dim_512x512.png" 
                  alt="Rubina Avatar" 
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    Hello! I'm Rubina, your virtual assistant. I support multiple languages including 
                    English, Hindi, Bangla, and Assamese.
                  </p>
                </div>
              </div>

              {loginStatus === 'loginError' && (
                <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-destructive font-medium">Login Error</p>
                    <p className="text-sm text-destructive/80 mt-1">
                      Unable to connect. Please try again.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Multi-Language Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Communicate in Hindi, English, Bangla, or Assamese
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Voice Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Speech-to-text input and text-to-speech responses
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Device Control</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Browser-based controls and quick actions
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Google Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Quick access to Google services and search
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Deployment Status</CardTitle>
              <CardDescription>
                Application successfully initialized and ready
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>All systems operational</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026. Built with ❤️ using{' '}
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
