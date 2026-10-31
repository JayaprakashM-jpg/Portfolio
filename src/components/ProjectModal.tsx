import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  ShieldAlert,
  Play,
  RotateCcw,
  Globe,
  ArrowUpRight,
} from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { selectedProject, setSelectedProject } = usePortfolio();

  // Interactive simulation state for ShieldAI
  const [selectedModel, setSelectedModel] = useState<'rf' | 'xgb' | 'mlp'>('rf');
  const [scanResult, setScanResult] = useState<{
    status: 'clean' | 'suspicious' | 'malware';
    score: number;
    family: string;
    action: string;
  } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Interactive simulation for Habit Tracker
  const [streakDays, setStreakDays] = useState([true, true, true, false, true, true, true]);

  if (!selectedProject) return null;

  const handleSimulateScan = (fileName: string) => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      if (fileName.includes('trojan') || fileName.includes('payload')) {
        setScanResult({
          status: 'malware',
          score: selectedModel === 'rf' ? 0.982 : selectedModel === 'xgb' ? 0.978 : 0.965,
          family: 'Win32/TrojanDownloader.Generic',
          action: 'Quarantined & Forensic Audit Generated',
        });
      } else {
        setScanResult({
          status: 'clean',
          score: 0.012,
          family: 'Verified PE Header Clean Binary',
          action: 'Whitelisted & Execution Authorized',
        });
      }
    }, 600);
  };

  const projectUrl = selectedProject.hostingUrl || selectedProject.liveDemoUrl;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-navy-surface border border-beige-border dark:border-navy-border rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-beige-border dark:border-navy-border flex items-start justify-between gap-4 shrink-0 bg-beige-light/50 dark:bg-navy/50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-terracotta uppercase tracking-wider mb-1">
              <span>{selectedProject.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedProject.date}</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-navy dark:text-beige-light">
              {selectedProject.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-beige mt-0.5">{selectedProject.subtitle}</p>
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            className="p-2 rounded-lg text-slate-400 hover:text-navy dark:hover:text-beige-light hover:bg-beige-surface dark:hover:bg-navy transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Main Visual Image */}
          <div className="relative rounded-xl overflow-hidden border border-beige-border dark:border-navy-border aspect-video bg-navy">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Overview */}
          <div>
            <h3 className="text-lg font-bold text-navy dark:text-beige-light mb-2">Architectural Summary</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedProject.longDescription}
            </p>
          </div>

          {/* Key Engineering Highlights */}
          {selectedProject.highlights && selectedProject.highlights.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-navy dark:text-beige-light mb-3">Key Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedProject.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-beige-light dark:bg-navy border border-beige-border dark:border-navy-border flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-navy dark:text-slate-300 leading-normal">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Simulation / Live Demo Experience */}
          {selectedProject.id === 'shieldai' && (
            <div className="p-5 rounded-xl bg-navy text-beige-light border border-navy-border space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-border pb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-terracotta" />
                  <span className="text-xs font-semibold tracking-wide uppercase text-beige">
                    Live Simulator: ShieldAI Threat Classification Engine
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-beige/80">
                  <span>Model Invariant:</span>
                  <span className="font-mono text-olive">Peak F1 Tournament</span>
                </div>
              </div>

              {/* Model Selector */}
              <div>
                <label className="text-xs text-beige/80 block mb-2 font-medium">Select Active ML Architecture:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedModel('rf')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedModel === 'rf'
                        ? 'bg-terracotta border-terracotta text-white font-bold'
                        : 'bg-navy-surface border-navy-border text-beige hover:bg-navy'
                    }`}
                  >
                    <span>Random Forest</span>
                    <span className="text-[10px] opacity-80">(F1: 0.982)</span>
                  </button>
                  <button
                    onClick={() => setSelectedModel('xgb')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedModel === 'xgb'
                        ? 'bg-terracotta border-terracotta text-white font-bold'
                        : 'bg-navy-surface border-navy-border text-beige hover:bg-navy'
                    }`}
                  >
                    <span>XGBoost</span>
                    <span className="text-[10px] opacity-80">(F1: 0.978)</span>
                  </button>
                  <button
                    onClick={() => setSelectedModel('mlp')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedModel === 'mlp'
                        ? 'bg-terracotta border-terracotta text-white font-bold'
                        : 'bg-navy-surface border-navy-border text-beige hover:bg-navy'
                    }`}
                  >
                    <span>Neural Net MLP</span>
                    <span className="text-[10px] opacity-80">(F1: 0.965)</span>
                  </button>
                </div>
              </div>

              {/* Sample Binary File Triggers */}
              <div className="pt-2">
                <label className="text-xs text-beige/80 block mb-2 font-medium">Inject Sample Binary for Batch Scan:</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSimulateScan('sample_win32_trojan_payload.exe')}
                    disabled={isScanning}
                    className="px-3 py-1.5 rounded-lg bg-red-950/60 text-red-300 border border-red-900 hover:bg-red-900/60 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    <span>Scan trojan_payload.exe</span>
                  </button>
                  <button
                    onClick={() => handleSimulateScan('standard_system_kernel.dll')}
                    disabled={isScanning}
                    className="px-3 py-1.5 rounded-lg bg-olive/20 text-olive border border-olive/40 hover:bg-olive/30 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    <span>Scan system_kernel.dll</span>
                  </button>
                </div>
              </div>

              {/* Scan output telemetry */}
              {isScanning && (
                <div className="p-3 rounded-lg bg-navy-surface border border-navy-border text-xs font-mono text-terracotta animate-pulse flex items-center gap-2">
                  <Cpu className="w-4 h-4 animate-spin" />
                  <span>Extracting PE headers, bytecode n-grams, and calculating tensor activations...</span>
                </div>
              )}

              {scanResult && !isScanning && (
                <div
                  className={`p-4 rounded-xl border text-xs font-mono space-y-1.5 ${
                    scanResult.status === 'malware'
                      ? 'bg-red-950/40 border-red-800 text-red-200'
                      : 'bg-olive/20 border-olive text-olive-dark dark:text-beige'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-sm">
                    <span>
                      {scanResult.status === 'malware' ? 'Threat Detected: MALWARE' : 'Integrity Verified: CLEAN'}
                    </span>
                    <span className="tabular-nums">Confidence: {(scanResult.score * 100).toFixed(1)}%</span>
                  </div>
                  <div className="text-slate-300">Classification: {scanResult.family}</div>
                  <div className="text-slate-400">Response Protocol: {scanResult.action}</div>
                </div>
              )}
            </div>
          )}

          {selectedProject.id === 'habit-tracker' && (
            <div className="p-5 rounded-xl bg-beige-light dark:bg-navy border border-beige-border dark:border-navy-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-navy dark:text-beige-light">
                  Interactive Daily Habit Streak Tester
                </span>
                <button
                  onClick={() => setStreakDays([true, true, true, false, true, true, true])}
                  className="text-xs text-terracotta hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>
              <div className="flex items-center gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <button
                    key={day}
                    onClick={() => {
                      const updated = [...streakDays];
                      updated[i] = !updated[i];
                      setStreakDays(updated);
                    }}
                    className={`flex-1 py-2 px-1 rounded-lg text-center text-xs font-medium border transition-colors cursor-pointer ${
                      streakDays[i]
                        ? 'bg-olive text-white border-olive shadow-xs'
                        : 'bg-white dark:bg-navy-surface text-slate-400 border-beige-border dark:border-navy-border'
                    }`}
                  >
                    <div>{day}</div>
                    <div className="text-[10px] mt-0.5">{streakDays[i] ? 'Done' : 'Skip'}</div>
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-500 dark:text-beige">
                Active Streak: <strong className="text-navy dark:text-beige-light">{streakDays.filter(Boolean).length} / 7 Days</strong>
              </div>
            </div>
          )}

          {/* Quantitative Metrics */}
          {selectedProject.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {selectedProject.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-beige-light dark:bg-navy border border-beige-border dark:border-navy-border text-center"
                >
                  <div className="text-sm sm:text-base font-bold text-navy dark:text-beige-light font-mono">
                    {metric.value}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-beige mt-0.5 font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack List */}
          <div className="pt-2 border-t border-beige-border dark:border-navy-border">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-beige uppercase tracking-wider mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-navy dark:text-slate-300">
              {selectedProject.techStack.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span>{tech}</span>
                  {idx < selectedProject.techStack.length - 1 && (
                    <span aria-hidden="true" className="text-beige dark:text-navy-border">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Live Website & Source Repo */}
        <div className="p-4 sm:p-6 border-t border-beige-border dark:border-navy-border bg-beige-light/50 dark:bg-navy/50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 dark:text-beige font-mono">
            ID: {selectedProject.id}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Live Website Button */}
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-dark rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Website</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Source Repository Button */}
            <a
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-navy dark:text-beige-light bg-white dark:bg-navy-surface hover:bg-beige-surface dark:hover:bg-navy border border-beige-border dark:border-navy-border rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Repository</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <button
              onClick={() => setSelectedProject(null)}
              className="px-4 py-2 text-xs font-semibold text-white bg-navy dark:bg-navy-surface hover:bg-slate-800 rounded-lg transition-colors cursor-pointer border border-navy-border"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
