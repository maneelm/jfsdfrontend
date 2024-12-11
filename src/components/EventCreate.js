import React, { useState, useEffect } from 'react';
import { createEvent, getAllEvents } from '../services/api';
import { 
    TextField, 
    Button, 
    Box, 
    Typography, 
    Container, 
    Paper, 
    Grid, 
    Card, 
    CardContent, 
    InputAdornment
} from '@mui/material';
import { 
    EventNote, 
    Title, 
    Description, 
    AccessTime, 
    PeopleOutline, 
    CloudUpload 
} from '@mui/icons-material';
import AdminNavbar from "./AdminNavbar";

const EventCreate = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        eventTitle: '',
        eventDescription: '',
        registrationStartingTime: '',
        registrationEndingTime: '',
        eventScheduleTime: '',
        limit: 0,
        eventCoverPhoto: null
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const eventsData = await getAllEvents();
        setEvents(eventsData);
    };

    const handleFileChange = (e) => {
        setNewEvent({ ...newEvent, eventCoverPhoto: e.target.files[0] });
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newEvent).forEach(key => {
            formData.append(key, newEvent[key]);
        });

        await createEvent(formData);
        fetchEvents();
        setNewEvent({
            eventTitle: '',
            eventDescription: '',
            registrationStartingTime: '',
            registrationEndingTime: '',
            eventScheduleTime: '',
            limit: 0,
            eventCoverPhoto: null
        });
    };
    const formFields = [
        { 
            label: "Event Title", 
            key: "eventTitle", 
            icon: <Title />,
            multiline: false 
        },
        { 
            label: "Event Description", 
            key: "eventDescription", 
            icon: <Description />,
            multiline: true,
            rows: 4 
        },
        { 
            label: "Registration Start", 
            key: "registrationStartingTime", 
            icon: <AccessTime />,
            type: "datetime-local" 
        },
        { 
            label: "Registration End", 
            key: "registrationEndingTime", 
            icon: <AccessTime />,
            type: "datetime-local" 
        },
        { 
            label: "Event Schedule", 
            key: "eventScheduleTime", 
            icon: <EventNote />,
            type: "datetime-local" 
        },
        { 
            label: "Participant Limit", 
            key: "limit", 
            icon: <PeopleOutline />,
            type: "number",
            min: 0
        }
    ];

    const renderTextField = (field) => (
        <TextField
            fullWidth
            label={field.label}
            variant="outlined"
            type={field.type || "text"}
            multiline={field.multiline}
            rows={field.rows}
            value={newEvent[field.key]}
            onChange={(e) => setNewEvent({ 
                ...newEvent, 
                [field.key]: e.target.value 
            })}
            required
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {field.icon}
                    </InputAdornment>
                ),
                inputProps: field.type === "number" ? { min: 0 } : {},
                sx: { color: 'white' }
            }}
            InputLabelProps={{
                sx: { color: 'rgba(255,255,255,0.7)' },
                shrink: true
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,0.5)',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'rgba(255,255,255,0.7)',
                    },
                    backgroundColor: 'rgba(255,255,255,0.05)'
                },
                '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                        color: 'rgba(255,255,255,0.9)'
                    }
                }
            }}
        />
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
                <AdminNavbar />
            </Box>

            <Box 
    sx={{ 
        flexGrow: 1,
        background: 'linear-gradient(135deg, #051937 0%, #162454 30%, #2A2A72 70%, #312944 100%)',
        py: 4, 
        minHeight: 'calc(100vh - 64px)'
    }}
>


                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Paper 
                                elevation={12} 
                                sx={{ 
                                    borderRadius: 3,
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    p: 4,
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.01)'
                                    }
                                }}
                            >
                                <Typography 
                                    variant="h4" 
                                    gutterBottom 
                                    sx={{ 
                                        textAlign: 'center', 
                                        color: 'white', 
                                        mb: 3,
                                        fontWeight: 'bold',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    Create New Event
                                </Typography>

                                <form onSubmit={handleEventSubmit}>
                                    <Grid container spacing={3}>
                                        {formFields.map((field) => (
                                            <Grid item xs={12} key={field.key}>
                                                {renderTextField(field)}
                                            </Grid>
                                        ))}
                                        
                                        <Grid item xs={12}>
                                            <Button
                                                component="label"
                                                variant="outlined"
                                                startIcon={<CloudUpload />}
                                                fullWidth
                                                sx={{
                                                    color: 'white',
                                                    borderColor: 'rgba(255,255,255,0.3)',
                                                    py: 1.5,
                                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                                    '&:hover': {
                                                        borderColor: 'white',
                                                        backgroundColor: 'rgba(255,255,255,0.1)'
                                                    }
                                                }}
                                            >
                                                Upload Event Cover Photo
                                                <input
                                                    type="file"
                                                    hidden
                                                    onChange={handleFileChange}
                                                    accept="image/*"
                                                    required
                                                />
                                            </Button>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button 
                                                type="submit" 
                                                variant="contained" 
                                                fullWidth
                                                sx={{
                                                    background: 'linear-gradient(45deg, #2A2A72 30%, #009FFD 90%)',
                                                    color: 'white',
                                                    py: 1.5,
                                                    fontWeight: 'bold',
                                                    borderRadius: 2,
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
                                                    }
                                                }}
                                            >
                                                Create Event
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                        {/* Events List */}
                        <Grid item xs={12} md={6}>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    color: 'white', 
                                    mb: 3, 
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                                }}
                            >
                                Upcoming Events
                            </Typography>
                            <Box sx={{ 
                                maxHeight: '70vh', 
                                overflowY: 'auto', 
                                pr: 2,
                                '&::-webkit-scrollbar': {
                                    width: '8px'
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '10px'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '10px',
                                    '&:hover': {
                                        background: 'rgba(255,255,255,0.3)'
                                    }
                                }
                            }}>
                                {events.map((event) => (
                                    <Card 
                                        key={event.id} 
                                        sx={{ 
                                            mb: 3, 
                                            background: 'rgba(255, 255, 255, 0.08)',
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: 3,
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.02)'
                                            }
                                        }}
                                    >
                                        {/* {event.eventCoverPhoto && (
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={event.eventCoverPhoto}
                                                alt={event.eventTitle}
                                                sx={{
                                                    objectFit: 'cover',
                                                    borderTopLeftRadius: 12,
                                                    borderTopRightRadius: 12
                                                }}
                                            />
                                        )} */}
                                        <CardContent>
                                            <Typography 
                                                variant="h5" 
                                                sx={{ 
                                                    color: '#009FFD', 
                                                    fontWeight: 'bold', 
                                                    mb: 2 
                                                }}
                                            >
                                                {event.eventTitle}
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                sx={{ 
                                                    color: 'white', 
                                                    mb: 1 
                                                }}
                                            >
                                                {event.eventDescription}
                                            </Typography>
                                            <Grid container spacing={1}>
                                                <Grid item xs={6}>
                                                    <Typography 
                                                        variant="body2" 
                                                        sx={{ color: 'rgba(255,255,255,0.7)' }}
                                                    >
                                                        <EventNote sx={{ verticalAlign: 'middle', mr: 1 }} />
                                                        {new Date(event.eventScheduleTime).toLocaleString()}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography 
                                                        variant="body2" 
                                                        sx={{ color: 'rgba(255,255,255,0.7)' }}
                                                    >
                                                        <PeopleOutline sx={{ verticalAlign: 'middle', mr: 1 }} />
                                                        Limit: {event.limit} participants
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default EventCreate;