import React, { useState, useEffect } from 'react';
import { Check, Loader2, Sparkles } from 'lucide-react';
import { PIPELINE_STEPS } from '../services/transformationService';

export default function PipelineStepper({ currentStep = 1, isComplete = false, onSkip }) {
  const [elapsed, setElapsed] = useState(0);

  // Elapsed timer for ETA display
  useEffect(() => {
    if (isComplete) return;
    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isComplete]);

  const totalSteps = PIPELINE_STEPS.length;
  const progressPercent = isComplete
    ? 100
    : Math.round(((currentStep - 1) / totalSteps) * 100);

  // ETA: estimate remaining seconds based on average time per step
  const avgSecondsPerStep = elapsed > 0 && currentStep > 1 
    ? elapsed / (currentStep - 1) 
    : 2;
  const remainingSteps = totalSteps - currentStep + 1;
  const etaSeconds = isComplete ? 0 : Math.max(1, Math.round(avgSecondsPerStep * remainingSteps));

  return (
    <div className="stepper-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--accent-500)" />
            AI Transformation Pipeline Active
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Processing source through verified institutional knowledge extraction pipeline
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-accent" style={{ fontFamily: 'var(--font-mono)' }}>
            Step {Math.min(currentStep, totalSteps)} of {totalSteps}
          </span>
          {onSkip && !isComplete && (
            <button 
              className="btn btn-outline btn-sm" 
              onClick={onSkip}
              title="Fast-forward simulation for demonstration review"
            >
              Skip Wait
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="pipeline-progress-bar">
        <div 
          className="pipeline-progress-fill" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="pipeline-progress-info">
        <span className="pipeline-progress-percent">
          {progressPercent}% Complete
        </span>
        <span>
          {isComplete 
            ? `Finished in ${elapsed}s` 
            : `~${etaSeconds}s remaining`
          }
        </span>
      </div>

      <div className="stepper-list" style={{ marginTop: '16px' }}>
        {PIPELINE_STEPS.map((step) => {
          const isDone = isComplete || step.id < currentStep;
          const isActive = !isComplete && step.id === currentStep;
          const isPending = !isComplete && step.id > currentStep;

          let itemClass = "stepper-item";
          if (isDone) itemClass += " completed";
          if (isActive) itemClass += " active";

          return (
            <div key={step.id} className={itemClass}>
              <div className="stepper-icon">
                {isDone ? (
                  <Check size={16} strokeWidth={3} />
                ) : isActive ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>

              <div className="stepper-content">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="stepper-title" style={{ color: isActive ? 'var(--accent-600)' : isDone ? 'var(--text-main)' : 'var(--text-dim)' }}>
                    {step.label}
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: isDone ? 'var(--success-600)' : isActive ? 'var(--accent-600)' : 'var(--text-dim)' }}>
                    {isDone ? 'Completed' : isActive ? 'Processing...' : 'Queued'}
                  </span>
                </div>
                <div className="stepper-desc">
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
