import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Loginss({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Full-screen centered wrapper */}
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

                {/* Card container */}
                <div className="flex w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl">

                    {/* ── LEFT PANEL: Illustrated Welcome ── */}
                    <div
                        className="hidden md:flex flex-col justify-end w-5/12 relative bg-[#0d1f3c]"
                        style={{ minHeight: '480px' }}
                    >
                        {/* Forest / nature illustration via SVG background — matches the dark-blue night-garden aesthetic */}
                        <div className="absolute inset-0 overflow-hidden">
                            {/* Sky gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d2240] to-[#102a4c]" />

                            {/* Stars */}
                            {[...Array(30)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-full bg-white opacity-70"
                                    style={{
                                        width: `${Math.random() * 2 + 1}px`,
                                        height: `${Math.random() * 2 + 1}px`,
                                        top: `${Math.random() * 50}%`,
                                        left: `${Math.random() * 100}%`,
                                    }}
                                />
                            ))}

                            {/* Mountains / dark hills */}
                            <svg
                                className="absolute bottom-0 left-0 w-full"
                                viewBox="0 0 260 300"
                                preserveAspectRatio="xMidYMax slice"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Far mountains */}
                                <path
                                    d="M0 180 Q30 100 70 130 Q100 80 130 110 Q160 60 190 100 Q220 70 260 120 L260 300 L0 300Z"
                                    fill="#0b2040"
                                />
                                {/* Mid hills */}
                                <path
                                    d="M0 220 Q40 160 80 190 Q110 150 150 175 Q185 145 220 170 Q240 155 260 165 L260 300 L0 300Z"
                                    fill="#0e2a50"
                                />
                                {/* Foreground hill */}
                                <path
                                    d="M0 260 Q50 230 100 245 Q150 220 200 240 Q230 228 260 235 L260 300 L0 300Z"
                                    fill="#122f5a"
                                />

                                {/* Pagoda / temple */}
                                <g transform="translate(140,115)">
                                    {/* Roof layers */}
                                    <polygon points="-18,0 0,-14 18,0" fill="#c9a227" opacity="0.95"/>
                                    <polygon points="-14,4 0,-8 14,4" fill="#e2b84b" opacity="0.9"/>
                                    {/* Body */}
                                    <rect x="-10" y="4" width="20" height="14" fill="#c9a227" opacity="0.85"/>
                                    {/* Door */}
                                    <rect x="-3" y="11" width="6" height="7" fill="#0e2a50"/>
                                    {/* Spire */}
                                    <line x1="0" y1="-14" x2="0" y2="-20" stroke="#e2b84b" strokeWidth="1.5"/>
                                </g>

                                {/* Trees - dark silhouettes */}
                                {[20, 45, 60, 175, 195, 215, 235].map((x, i) => (
                                    <g key={i} transform={`translate(${x}, ${200 + (i % 3) * 10})`}>
                                        <polygon
                                            points={`0,-${28 + (i % 2) * 8} ${-(10 + i % 4)},0 ${10 + i % 4},0`}
                                            fill={i % 2 === 0 ? '#0a2548' : '#0c2e56'}
                                        />
                                    </g>
                                ))}

                                {/* Flower bushes - colored dots */}
                                {[
                                    { cx: 30, cy: 260, r: 6, color: '#f5a623' },
                                    { cx: 50, cy: 265, r: 5, color: '#f7c948' },
                                    { cx: 70, cy: 258, r: 7, color: '#f5a623' },
                                    { cx: 175, cy: 255, r: 5, color: '#4fc3a1' },
                                    { cx: 190, cy: 250, r: 6, color: '#5dd4b4' },
                                    { cx: 205, cy: 258, r: 4, color: '#4fc3a1' },
                                ].map((dot, i) => (
                                    <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.color} opacity="0.85" />
                                ))}

                                {/* Glowing moon reflection path on ground */}
                                <ellipse cx="130" cy="268" rx="18" ry="4" fill="#c9a227" opacity="0.18" />

                                {/* Ground foliage */}
                                <path
                                    d="M0 280 Q65 265 130 275 Q195 260 260 272 L260 300 L0 300Z"
                                    fill="#0a2440"
                                />
                            </svg>
                        </div>

                        {/* WELCOME text */}
                        <div className="relative z-10 p-8 pb-10">
                            <p
                                className="text-white tracking-[0.35em] text-sm font-light uppercase"
                                style={{ fontFamily: "'Georgia', serif", letterSpacing: '0.35em' }}
                            >
                                Welcome
                            </p>
                        </div>
                    </div>

                    {/* ── RIGHT PANEL: Login Form ── */}
                    <div className="flex-1 bg-white flex flex-col justify-center px-8 py-12 md:px-12">

                        <h1
                            className="text-2xl font-semibold text-gray-800 mb-8"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Login
                        </h1>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">

                            {/* Email */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="text-gray-500 text-sm mb-1"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full border-0 border-b border-gray-300 rounded-none px-0 py-1 text-sm text-gray-800 focus:ring-0 focus:border-[#1a2f5a] bg-transparent"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-1 text-xs" />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                        className="text-gray-500 text-sm"
                                    />
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs text-[#1a3a6e] hover:text-[#0d2247] underline underline-offset-2 transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full border-0 border-b border-gray-300 rounded-none px-0 py-1 text-sm text-gray-800 focus:ring-0 focus:border-[#1a2f5a] bg-transparent"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-1 text-xs" />
                            </div>

                            {/* Remember me */}
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-gray-300 text-[#1a2f5a]"
                                    />
                                    <span className="text-sm text-gray-500">Remember me</span>
                                </label>
                            </div>

                            {/* Login button */}
                            <PrimaryButton
                                className="w-full justify-center bg-[#1a2f5a] hover:bg-[#0d1f3c] text-white py-3 rounded-lg text-sm font-medium tracking-wide transition-colors"
                                disabled={processing}
                            >
                                Login
                            </PrimaryButton>
                        </form>

                        {/* Sign up link */}
                        <p className="mt-8 text-center text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link
                                href={route('register')}
                                className="text-[#1a3a6e] hover:text-[#0d2247] underline underline-offset-2 transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}