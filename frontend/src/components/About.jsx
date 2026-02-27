import React, { useEffect, useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { portfolioAPI } from "../services/api";

const About = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await portfolioAPI.getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <section id="about" className="relative section-padding bg-slate-950 overflow-hidden">
      {/* soft glows */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-purple-500/15 blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12">
          About{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Me
          </span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="w-full">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl shadow-black/30">
              {/* fixed height, responsive */}
              <div className="h-[360px] sm:h-[420px]">
                {profile?.profile_image ? (
                  <img
                    src={profile.profile_image}
                    alt={profile?.name || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                      <span className="text-white text-5xl font-bold">
                        {profile?.name?.charAt(0) || "A"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="w-full">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-md p-8 md:p-10 shadow-xl shadow-black/20">
              <p className="text-gray-200/90 text-lg leading-relaxed">
                {profile?.bio || (
                  <span className="text-gray-400">Loading bio...</span>
                )}
              </p>

              <div className="mt-8 space-y-4">
                {profile?.location && (
                  <div className="flex items-center gap-4 text-gray-200/90">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                      <MapPin size={18} className="text-blue-400" />
                    </span>
                    <span className="text-base">{profile.location}</span>
                  </div>
                )}

                {profile?.email && (
                  <div className="flex items-center gap-4 text-gray-200/90">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                      <Mail size={18} className="text-purple-400" />
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-base hover:text-white transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                )}

                {profile?.phone && (
                  <div className="flex items-center gap-4 text-gray-200/90">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                      <Phone size={18} className="text-blue-400" />
                    </span>
                    <span className="text-base">{profile.phone}</span>
                  </div>
                )}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                {profile?.resume && (
                  <a
                    href={profile.resume}
                    download
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                  >
                    Download Resume
                  </a>
                )}

                <a
                  href="#projects"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/15 text-gray-100 hover:bg-white/10 transition-all"
                >
                  View Projects
                </a>
              </div>
            </div>

            {/* small credibility line (optional) */}
            <p className="mt-4 text-sm text-gray-400">
              Recruiter tip: keep this section concise—focus on impact, tech stack, and results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;