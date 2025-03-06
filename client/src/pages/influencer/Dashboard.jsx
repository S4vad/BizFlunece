import React from 'react';
import { 
  Button, 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import { 
  Email, 
  CalendarToday, 
  AccountBalanceWallet,
  Campaign,
  Notifications,
  Timeline,
  People
} from '@mui/icons-material';

// StatCard Component
const StatCard = ({ title, value, trend }) => (
  <Paper sx={{ p: 3, borderRadius: 4 }}>
    <Typography variant="subtitle2" color="text.secondary">
      {title}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1 }}>
      <Typography variant="h4">{value}</Typography>
      {trend && (
        <Chip 
          label={trend} 
          size="small" 
          sx={{ ml: 1, bgcolor: trend.startsWith('+') ? '#e8f5e9' : '#ffebee' }} 
        />
      )}
    </Box>
  </Paper>
);

// CampaignTimeline Component
const CampaignTimeline = ({ campaigns }) => (
  <Paper sx={{ p: 3, borderRadius: 4, mb: 4 }}>
    <Typography variant="h6" gutterBottom>Active Campaigns</Typography>
    <List>
      {campaigns.map((campaign, index) => (
        <React.Fragment key={campaign.id}>
          <ListItem>
            <ListItemIcon>
              <Campaign color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={campaign.name}
              secondary={`Status: ${campaign.status} | Deadline: ${campaign.deadline}`}
            />
            <Chip label={campaign.platform} color="secondary" />
          </ListItem>
          {index < campaigns.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </Paper>
);

// NotificationPanel Component
const NotificationPanel = () => (
  <Paper sx={{ p: 3, borderRadius: 4 }}>
    <Typography variant="h6" gutterBottom>Notifications</Typography>
    <List>
      {[1, 2, 3].map((item) => (
        <ListItem key={item}>
          <ListItemIcon>
            <Notifications color="warning" />
          </ListItemIcon>
          <ListItemText
            primary="New campaign invitation"
            secondary={`Brand X invited you to collaborate (${item} days ago)`}
          />
        </ListItem>
      ))}
    </List>
  </Paper>
);

// Placeholder Charts (Replace with actual chart implementations)
const EngagementChart = () => (
  <Paper sx={{ p: 3, borderRadius: 4, height: 300 }}>
    <Typography variant="h6">Engagement Rate</Typography>
    <Box sx={{ height: 250, bgcolor: '#f5f5f5', mt: 2 }} />
  </Paper>
);

const AudienceDemographicsChart = () => (
  <Paper sx={{ p: 3, borderRadius: 4, height: 300 }}>
    <Typography variant="h6">Audience Demographics</Typography>
    <Box sx={{ height: 250, bgcolor: '#f5f5f5', mt: 2 }} />
  </Paper>
);

// Main App Component
export default function Dashboard() {
  const activeCampaigns = [
    { id: 1, name: 'Summer Collection', status: 'Active', deadline: '2024-07-15', platform: 'Instagram' },
    { id: 2, name: 'Product Launch', status: 'In Review', deadline: '2024-07-20', platform: 'YouTube' },
  ];

  return (
    <Box sx={{ maxWidth: 'xl', mx: 'auto', p: 3 }}>
      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatCard title="Active Campaigns" value="5" trend="+2" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Avg. Engagement" value="8.2%" trend="-0.5%" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Pending Earnings" value="$2,450" />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<Email />}
            sx={{ py: 2, borderRadius: 3 }}
          >
            New Proposals (3)
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button 
            variant="outlined" 
            fullWidth 
            startIcon={<CalendarToday />}
            sx={{ py: 2, borderRadius: 3 }}
          >
            Content Calendar
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button 
            variant="contained" 
            color="secondary" 
            fullWidth 
            startIcon={<AccountBalanceWallet />}
            sx={{ py: 2, borderRadius: 3 }}
          >
            Withdraw Earnings
          </Button>
        </Grid>
      </Grid>

      {/* Campaign Timeline */}
      <CampaignTimeline campaigns={activeCampaigns} />

      {/* Analytics Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={6}>
          <EngagementChart />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AudienceDemographicsChart />
        </Grid>
      </Grid>

      {/* Notifications */}
      <NotificationPanel />
    </Box>
  );
}