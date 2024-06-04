import Header from '../(components)/header';
import { auth } from "@/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="flex-grow md:overflow-y-auto">
                <Header session={session} />
                {children}</div>
        </div>
    );
}