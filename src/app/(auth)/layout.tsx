export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo/Brand for Auth Pages */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">NodeWave Todo</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your tasks efficiently
          </p>
        </div>

        {/* Auth Content */}
        <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
