#!/bin/bash
# Setup script for auto-running agent
# Makes the agent run automatically EVERY DAY

# Get the current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Create the cron job (runs EVERY DAY at 2 AM)
CRON_JOB="0 2 * * * cd $DIR && /usr/local/bin/node auto-agent.js >> agent-log.txt 2>&1"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "auto-agent.js"; then
    echo "✅ Cron job already exists!"
else
    # Add the cron job
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    echo "✅ Cron job created!"
    echo "📅 Agent will run automatically EVERY DAY at 2 AM"
fi

echo ""
echo "🔍 Current cron jobs:"
crontab -l

echo ""
echo "✨ Setup complete!"
echo ""
echo "To run manually right now: node auto-agent.js"
echo "To view logs: tail -f agent-log.txt"
echo "To remove schedule: crontab -e (then delete the auto-agent line)"