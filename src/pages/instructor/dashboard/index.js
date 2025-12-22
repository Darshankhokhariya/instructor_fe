"use client";
import Layout from "@/components/layout/Layout";
import { BiBusSchool, BiGroup } from "react-icons/bi";
import {
    MdAddCircle,
    MdVideocam,
    MdCloudUpload,
    MdPersonAdd,
    MdNotifications
} from "react-icons/md";

export default function DashboardPage() {
    return (
        <Layout>
            <div className="bg-background-light dark:bg-background-dark flex">
                {/* Main Content */}
                <div className="flex-1 flex flex-col px-4">
                    {/* Page Content */}
                    <main className="p-4 md:p-6 space-y-6">
                        {/* <!-- Earnings Summary --> */}
                        <section class="rounded-2xl bg-white dark:bg-card-dark p-5 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5">
                            <div class="mb-4 flex items-center justify-between">
                                <div>
                                    <p class="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Total Earnings</p>
                                    <div class="flex items-baseline gap-2">
                                        <h3 class="text-3xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark">$1,240</h3>
                                        <span class="flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary-dark dark:text-primary">
                                            <span class="material-symbols-outlined mr-0.5 text-sm">trending_up</span> +12%
                                        </span>
                                    </div>
                                </div>
                                <div class="flex overflow-hidden rounded-lg bg-background-light dark:bg-background-dark p-1">
                                    <button class="rounded-md bg-white dark:bg-card-dark px-3 py-1 text-xs font-bold text-text-main-light dark:text-text-main-dark shadow-sm">Week</button>
                                    <button class="rounded-md px-3 py-1 text-xs font-medium text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark">Month</button>
                                </div>
                            </div>
                            {/* <!-- Chart Visualization --> */}
                            <div class="h-40 w-full">
                                <svg class="overflow-visible" fill="none" height="100%" preserveaspectratio="none" viewbox="0 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                                    {/* <!-- Gradient Fill --> */}
                                    <defs>
                                        <lineargradient gradientunits="userSpaceOnUse" id="paint0_linear_1131_5935" x1="239" x2="239" y1="0" y2="150">
                                            <stop stop-color="#19e6c4" stop-opacity="0.2"></stop>
                                            <stop offset="1" stop-color="#19e6c4" stop-opacity="0"></stop>
                                        </lineargradient>
                                    </defs>
                                    <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z" fill="url(#paint0_linear_1131_5935)"></path>
                                    {/* <!-- Line Path --> */}
                                    <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#19e6c4" stroke-linecap="round" stroke-width="3"></path>
                                </svg>
                            </div>
                            <div class="mt-2 flex justify-between px-1">
                                <p class="text-xs font-medium text-text-sub-light dark:text-text-sub-dark">Mon</p>
                                <p class="text-xs font-medium text-text-sub-light dark:text-text-sub-dark">Tue</p>
                                <p class="text-xs font-medium text-text-sub-light dark:text-text-sub-dark">Wed</p>
                                <p class="text-xs font-medium text-text-sub-light dark:text-text-sub-dark">Thu</p>
                                <p class="text-xs font-medium text-text-sub-light dark:text-text-sub-dark">Fri</p>
                                <p class="text-xs font-medium text-text-sub-light dark:text-text-sub-dark">Sat</p>
                                <p class="text-xs font-medium text-text-sub-light dark:text-text-sub-dark">Sun</p>
                            </div>
                        </section>
                        {/* Stats */}
                        <div class="grid grid-cols-2 gap-4">
                            <div class="flex flex-col gap-1 rounded-2xl bg-white dark:bg-card-dark p-4 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5">
                                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                                    <BiGroup class="text-lg" />
                                </div>
                                <p class="mt-2 text-2xl font-bold text-text-main-light dark:text-text-main-dark">1.2k</p>
                                <p class="text-xs text-text-sub-light dark:text-text-sub-dark">Active Subscribers</p>
                            </div>
                            <div class="flex flex-col gap-1 rounded-2xl bg-white dark:bg-card-dark p-4 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5">
                                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                    <span class="material-symbols-outlined text-lg"><BiBusSchool /></span>
                                </div>
                                <p class="mt-2 text-2xl font-bold text-text-main-light dark:text-text-main-dark">856</p>
                                <p class="text-xs text-text-sub-light dark:text-text-sub-dark">Total Students</p>
                            </div>
                        </div>
                        {/* quick action */}
                        <div className="px-2">
                            <div className="mb-3 flex items-center justify-between">
                                <h2 className="text-lg font-bold leading-tight text-text-main-light dark:text-text-main-dark">
                                    Quick Actions
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Action 1 */}
                                <button className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl bg-white dark:bg-card-dark p-4 text-left shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 transition-all hover:shadow-md">
                                    <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-xl transition-all group-hover:scale-150"></div>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary-dark dark:text-primary z-10">
                                        <MdAddCircle size={22} />
                                    </div>
                                    <div className="z-10">
                                        <p className="font-semibold text-text-main-light dark:text-text-main-dark">Create Course</p>
                                        <p className="text-xs text-text-sub-light dark:text-text-sub-dark">New Series</p>
                                    </div>
                                </button>

                                {/* Action 2 */}
                                <button className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl bg-white dark:bg-card-dark p-4 text-left shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 transition-all hover:shadow-md">
                                    <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-gradient-to-br from-red-400/20 to-transparent blur-xl transition-all group-hover:scale-150"></div>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 z-10">
                                        <MdVideocam size={22} />
                                    </div>
                                    <div className="z-10">
                                        <p className="font-semibold text-text-main-light dark:text-text-main-dark">Schedule Live</p>
                                        <p className="text-xs text-text-sub-light dark:text-text-sub-dark">Zoom Integration</p>
                                    </div>
                                </button>

                                {/* Action 3 */}
                                <button className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl bg-white dark:bg-card-dark p-4 text-left shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 transition-all hover:shadow-md">
                                    <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/20 to-transparent blur-xl transition-all group-hover:scale-150"></div>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 z-10">
                                        <MdCloudUpload size={22} />
                                    </div>
                                    <div className="z-10">
                                        <p className="font-semibold text-text-main-light dark:text-text-main-dark">Upload Content</p>
                                        <p className="text-xs text-text-sub-light dark:text-text-sub-dark">Video & Audio</p>
                                    </div>
                                </button>

                                {/* Action 4 */}
                                <button className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl bg-white dark:bg-card-dark p-4 text-left shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 transition-all hover:shadow-md">
                                    <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-gradient-to-br from-yellow-400/20 to-transparent blur-xl transition-all group-hover:scale-150"></div>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 z-10">
                                        <MdPersonAdd size={22} />
                                    </div>
                                    <div className="z-10">
                                        <p className="font-semibold text-text-main-light dark:text-text-main-dark">Manage Requests</p>
                                        <p className="text-xs text-text-sub-light dark:text-text-sub-dark">3 Pending</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                        {/* <!-- Upcoming Classes List --> */}
                        <div>
                            <div class="mb-3 flex items-center justify-between pt-2">
                                <h2 class="text-lg font-bold leading-tight text-text-main-light dark:text-text-main-dark">Upcoming Classes</h2>
                                <a class="text-sm font-semibold text-primary-dark dark:text-primary hover:underline" href="#">See All</a>
                            </div>
                            <div class="flex flex-col gap-3">
                                {/* <!-- Class Item 1 --> */}
                                <div class="group flex items-center gap-4 rounded-2xl bg-white dark:bg-card-dark p-3 pr-4 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                    <div class="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                                        <div class="absolute inset-0 bg-black/10"></div>
                                        <img class="h-full w-full object-cover" data-alt="Person practicing yoga pose outdoors at sunset" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAdO4QePmH7FmxYZjNXciTMqYaHwgaJy-1JANl4ZxsOFxlVQ--l17qE8Ntq4pyddLyOm9oV8oMUr4qPbeVU9-qSRxtJpfT6kfG5giyJVr4M-BUyrDQXkRU6USuA9osHRXBdtB7FT5e_srGq4OkHxdkk5zdZ9vFxGE1TZJdXTWB4HxWJ3-1FOc5u9Pt3bzsjVYmYOLkXmA34QxE4pi2BPVbfYvG3m2jYwWRNKRukYvIr19poB0xEtL_6E1ulK_qVopTJYl-DUMecvQI" />
                                    </div>
                                    <div class="flex flex-1 flex-col">
                                        <div class="flex items-start justify-between">
                                            <h3 class="font-bold text-text-main-light dark:text-text-main-dark">Morning Flow</h3>
                                            <span class="rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Live</span>
                                        </div>
                                        <p class="text-xs text-text-sub-light dark:text-text-sub-dark">Today • 09:00 AM - 10:00 AM</p>
                                        <div class="mt-2 flex items-center gap-2">
                                            <div class="flex -space-x-2">
                                                <img alt="Student" class="h-5 w-5 rounded-full ring-2 ring-white dark:ring-card-dark" data-alt="Student portrait thumbnail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz6d8TpKdrjXJ_KByrPWJXtNWgge6JymHbhmUfEiwNyZQ_bg0kQDfUiVbLboVc72joBgGbljFXMlGi2PZLWTbSoCuA1DBX1LYC_Osq2qLv3mre5oEyuDiKA1RwWCTL4Ilwvell4DR92FZJZepU_vb16m7gwTIcl3lPkmBWozBVF1EtGKw9zHUt9IjYU8VczKLZ-IGIvb-mIg6eG_bmW-pT_7eQ2b_eBUyEj_DdFm-U_QzOUFFJzszKpzNPkap9-4nxfmnphGK2jKQk" />
                                                <img alt="Student" class="h-5 w-5 rounded-full ring-2 ring-white dark:ring-card-dark" data-alt="Student portrait thumbnail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsHH2fpJROWIMeF2aAzuKN2TnwE5imStoTbSHOkWdn4ngIboUAJEPIXu_YshqNXHuhAsaVWZKKb4wXxpns6rFqN_7pI1byD_oQ0CtKscldJzUT66_F4aM-LGqz7fr9JmkQTQmAdYob6-Kg5nhcN51_lZtC62wiyqC7XLQGogpKyuNHG0HyEd2lOytunhULlWAgHYEwLq-jSlP9JsdybRWd6GhAiXmrj1Ppx1sW1fGosAyt98IVVHmwWaKlHmjSWtLLWP_1sjZo39Go" />
                                                <img alt="Student" class="h-5 w-5 rounded-full ring-2 ring-white dark:ring-card-dark" data-alt="Student portrait thumbnail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALuPQ-rlixtyccok9LgYwe_3dtbt2hP1JT2w56cTwydd3CPn6oqSBHhirN2SHidSvNIoENUGm4v3v_As29flr9mJGE79y6W4-gO1SHg5CHGgBZGDjFpOFgYpxe8PmOLrbqixTQ0vyfTWRCptEUiOvFIIzdksIktq-9gNA_uEZBuXh08ZiEF5fTfUL3JoiYQH5zjvkctkyF5sgmYLkxnFrokeg-Sy79oqPI7ludUaOEMOYaFJMPkTYA-fl4wbkTfDiwBNnQDdsXYmgs" />
                                            </div>
                                            <span class="text-xs font-medium text-text-sub-light dark:text-text-sub-dark">+42 Registered</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Class Item 2 --> */}
                                <div class="group flex items-center gap-4 rounded-2xl bg-white dark:bg-card-dark p-3 pr-4 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                    <div class="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                                        <div class="absolute inset-0 bg-black/10"></div>
                                        <img class="h-full w-full object-cover" data-alt="Calm yoga studio interior with mats" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5oLq9TcdYbmq9YphZa_n9P1uQVzs3Djql8qY0mjo8d6WoyCHAZfdcfQhy2O4x1Agwg3nXZhz9Y5cCXXUY25kD_9IgDfeUJVortd4nKzix1Z0_qIuGIeRymZrjB_AXyngTUYxNi8gW6kDU0LeqBFp2cWIqsfb14zNsj2MwI4-pe55pFGJuWF2IMYYtx1-Llx7rBQgdon7bHPvd-vLZuqLbB8j05RotpypYD0KabcOuLFzrRmoG0lGrbPNx-LZLAwJFcJg9Wde_6Nob" />
                                    </div>
                                    <div class="flex flex-1 flex-col">
                                        <div class="flex items-start justify-between">
                                            <h3 class="font-bold text-text-main-light dark:text-text-main-dark">1:1 Coaching</h3>
                                            <span class="rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Private</span>
                                        </div>
                                        <p class="text-xs text-text-sub-light dark:text-text-sub-dark">Today • 02:00 PM - 03:00 PM</p>
                                        <div class="mt-2 flex items-center gap-2">
                                            <div class="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary-dark">S</div>
                                            <span class="text-xs font-medium text-text-sub-light dark:text-text-sub-dark">With Sarah J.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </Layout>
    );
}

