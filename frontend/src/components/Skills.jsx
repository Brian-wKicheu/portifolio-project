import React, { useEffect, useMemo, useState } from "react";
import { portfolioAPI } from "../services/api";

const Skills = () => {
  const [skillsByCategory, setSkillsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await portfolioAPI.getSkillsByCategory();

        const data = response?.data ?? {};
        const normalized =
          data && typeof data === "object"
            ? Object.fromEntries(
                Object.entries(data).map(([category, skills]) => [
                  category,
                  Array.isArray(skills) ? skills : [],
                ])
              )
            : {};

        setSkillsByCategory(normalized);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setSkillsByCategory({});
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categories = useMemo(
    () => Object.entries(skillsByCategory),
    [skillsByCategory]
  );

  if (loading) {
    return (
      <section id="skills" className="section-padding bg-slate-950">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold">Loading Skills...</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="section-padding bg-slate-950 relative overflow-hidden">
      {/* subtle background glow */}
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12">
          My{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(([category, skills]) => (
            <div
              key={category}
              className="group rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-7 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {category}
                </h3>
                <span className="text-xs font-semibold text-gray-300/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  {Array.isArray(skills) ? skills.length : 0}
                </span>
              </div>

              <div className="space-y-5">
                {(Array.isArray(skills) ? skills : []).map((skill) => {
                  const pct = Number(skill?.proficiency ?? 0);
                  return (
                    <div key={skill?.id ?? `${category}-${skill?.name}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-200 font-medium">
                          {skill?.name}
                        </span>
                        <span className="text-gray-400 text-sm">{pct}%</span>
                      </div>

                      <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            No skills found.
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;