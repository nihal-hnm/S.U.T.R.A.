import React from 'react';
import { GitBranch } from 'lucide-react';

export default function VersionBadge({ version = 1, timestamp }) {
  return (
    <span className="version-badge" title={timestamp ? `Generated: ${timestamp}` : undefined}>
      <GitBranch size={10} />
      v{version}
    </span>
  );
}
