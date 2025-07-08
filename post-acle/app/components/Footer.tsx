'use client';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#0c0c17] px-8 py-10 border-t border-gray-800 mt-10 text-sm text-gray-400">
            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <h5 className="text-fuchsia-400 font-bold text-lg mb-2">PostAcle</h5>
                    <p>Your smart AI-powered blogging platform for trends, tech, and topics that matter.</p>
                </div>
                <div>
                    <h6 className="font-semibold mb-2">Pages</h6>
                    <ul className="space-y-1">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/search">Search</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                        <li><Link href="/terms">Terms of Service</Link></li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-semibold mb-2">Contact</h6>
                    <p>📧 epicdeveloper144@gmail.com</p>
                    <p>📞 +91 8010182409</p>
                    <div className="mt-4">
                        <h6 className="font-semibold mb-1">Social</h6>
                        <p>👨‍💻 Swaraj Puppalwar</p>
                        <p>🚀 YouthVibe</p>
                    </div>
                </div>
            </div>
            <p className="text-center mt-6 text-xs">© 2025 PostAcle. All rights reserved.</p>
        </footer>
    );
}
