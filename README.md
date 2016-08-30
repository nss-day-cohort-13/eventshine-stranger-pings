# Event Ticketing System

![Stranger Pings](ticket_project/stranger_pings/static/stranger-pings.png)

Your mission is to design, model, and build a Django application that allows users to purchase a ticket to an event, and allows a user to create an event.

## Event

The event will need the following properties. You may add more as you see fit.

1. Name
1. Description
1. City
1. Begin date/time
1. End date/time
1. Attendee limit
1. Venue

## Venue

It's possible that there can be many events going on at a single venue at any point in time, so keep that in consideration.

## User

Any user can register for any number of events, but if the user mistakenly overbooks their time, provide a notification when they log in to that effect. Use built-in Django [user authentication model](https://docs.djangoproject.com/en/1.10/topics/auth/default/#creating-users) to allow users to create a new account in your application.

> **Note:** Make sure you enable the [SessionMiddleware](https://docs.djangoproject.com/en/1.10/topics/http/sessions/) for your application.

# Stretch Goals

## Presenters

Allow a user to register as a present at an event. The user must provide the name of their talk and the time at which they would like to present. Ensure that any given time slot is not double-booked.

## Sponsors

When creating an event, let the user indicate that it is possible for other users to sponsor the event.

Allow users to indiciate that they wish to sponsor the event. The user will provide their company information, the amount of money they wish to donate for sponsorship, and their company logo.
