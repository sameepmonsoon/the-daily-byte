import { getUserSession } from '@/app/api/auth/[...nextauth]/options';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SiteHeader } from '@/components/sidebar/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  return (
    <SidebarProvider>
      <AppSidebar serverSession={session} />
      <SidebarInset className='overflow-x-hidden'>
        <SiteHeader />
        <section className='p-8 h-full  dark:bg-gray-900/95 bg-gray-100 text-primary dark:text-white'>{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
