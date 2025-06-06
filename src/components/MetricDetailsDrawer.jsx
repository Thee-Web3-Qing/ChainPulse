import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography, IconButton, Divider, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingState from './LoadingState';

const TIMEFRAMES = [
  { label: '24h', value: '24h' },
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' }
];

const metricDetails = {
  tvl: {
    title: 'Total Value Locked (TVL)',
    description: 'TVL represents the total value of assets locked in the protocol. It is a key indicator of trust and adoption. Higher TVL means more users are depositing assets into the protocol.',
    details: (project) => `Current TVL: $${project.tvl.toLocaleString()}`
  },
  wallets: {
    title: 'Active Wallets',
    description: 'Active wallets shows the number of unique wallets interacting with the project. It reflects user adoption and community growth.',
    details: (project) => `Active Wallets: ${project.wallets.toLocaleString()}`
  },
  mentions: {
    title: 'Social Mentions',
    description: 'Social mentions count the number of times this project was mentioned on social media (e.g., Twitter) in the last 24 hours. It is a measure of community engagement and hype.',
    details: (project) => `Mentions (24h): ${Array.isArray(project.mentions) ? project.mentions.length : 0}`
  },
  commits: {
    title: 'GitHub Commits',
    description: 'Development activity is measured by the number of code commits in the last 30 days. More commits usually means more active development and innovation.',
    details: (project) => `Commits (30d): ${project.commits.toLocaleString()}`
  }
};

export default function MetricDetailsDrawer({ open, onClose, metric, project, showBackArrow }) {
  const [timeframe, setTimeframe] = useState('7d');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && metric) {
      setLoading(true);
      // Simulate data fetching
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [open, metric]);

  if (!metric || !project) return null;
  const info = metricDetails[metric];
  if (!info) return null;

  // Mocked historical/timeframe data for demonstration
  const mockData = {
    wallets: {
      increase: 120, // wallets added in timeframe
      inactive: 50, // inactive wallets
    },
    tvl: {
      percentChange: 4.2, // % change in timeframe
      l1Comparison: 'Ethereum',
      l1Tvl: 50000000, // L1 TVL for comparison
    },
    mentions: {
      impressions: 12000,
      mentions: Array.isArray(project.mentions) ? project.mentions.length : 0,
      likes: 340,
      comments: 45,
    },
    commits: {
      first: '2023-01-15',
      last: '2024-06-30',
      total: project.commits || 0,
    }
  };

  let content = null;
  if (loading) {
    content = <LoadingState message={`Loading ${metric} details...`} />;
  } else if (error) {
    content = (
      <Typography color="error" sx={{ p: 2 }}>
        {error}
      </Typography>
    );
  } else if (metric === 'wallets') {
    content = (
      <>
        <Typography variant="h6" sx={{ mb: 2 }}>Active Wallets</Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Timeframe</InputLabel>
          <Select value={timeframe} label="Timeframe" onChange={e => setTimeframe(e.target.value)}>
            {TIMEFRAMES.map(tf => <MenuItem key={tf.value} value={tf.value}>{tf.label}</MenuItem>)}
          </Select>
        </FormControl>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Total Active Wallets:</b> {project.wallets?.toLocaleString() || 0}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Increase in {timeframe}:</b> +{mockData.wallets.increase}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Inactive Wallets:</b> {mockData.wallets.inactive}
        </Typography>
      </>
    );
  } else if (metric === 'tvl') {
    content = (
      <>
        <Typography variant="h6" sx={{ mb: 2 }}>Total Value Locked (TVL)</Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Timeframe</InputLabel>
          <Select value={timeframe} label="Timeframe" onChange={e => setTimeframe(e.target.value)}>
            {TIMEFRAMES.map(tf => <MenuItem key={tf.value} value={tf.value}>{tf.label}</MenuItem>)}
          </Select>
        </FormControl>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Current TVL:</b> ${project.tvl?.toLocaleString() || 0}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Change in {timeframe}:</b> {mockData.tvl.percentChange > 0 ? '+' : ''}{mockData.tvl.percentChange}%
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Compared to {mockData.tvl.l1Comparison} TVL:</b> ${mockData.tvl.l1Tvl.toLocaleString()}
        </Typography>
      </>
    );
  } else if (metric === 'mentions') {
    content = (
      <>
        <Typography variant="h6" sx={{ mb: 2 }}>Social Mentions</Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Timeframe</InputLabel>
          <Select value={timeframe} label="Timeframe" onChange={e => setTimeframe(e.target.value)}>
            {TIMEFRAMES.map(tf => <MenuItem key={tf.value} value={tf.value}>{tf.label}</MenuItem>)}
          </Select>
        </FormControl>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Mentions:</b> {mockData.mentions.mentions}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Impressions:</b> {mockData.mentions.impressions}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Likes:</b> {mockData.mentions.likes}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Comments:</b> {mockData.mentions.comments}
        </Typography>
      </>
    );
  } else if (metric === 'commits') {
    content = (
      <>
        <Typography variant="h6" sx={{ mb: 2 }}>Development Activity</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>First Commit Date:</b> {mockData.commits.first}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Last Commit Date:</b> {mockData.commits.last}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Total Commits:</b> {mockData.commits.total}
        </Typography>
      </>
    );
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {showBackArrow && (
              <IconButton onClick={onClose} size="small">
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ fontWeight: 600, ml: showBackArrow ? 1 : 0 }}>
              {metric === 'wallets' && 'Active Wallets'}
              {metric === 'tvl' && 'Total Value Locked (TVL)'}
              {metric === 'mentions' && 'Social Mentions'}
              {metric === 'commits' && 'Development Activity'}
            </Typography>
          </Box>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ mb: 2 }}>{info.description}</Typography>
        {content}
      </Box>
    </Drawer>
  );
} 