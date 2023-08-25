#!/usr/bin/env node

import { Trip } from "../lib/cheapestrip.js"

async function takeOff(){
  const trip = new Trip();
  await trip.initialize();
  const cheapestFlight = await trip.searchCheapestFlight(
    trip.locale,
    trip.currency
  );
  await trip.showCheapestFlight(cheapestFlight);
}

takeOff();