import { Injectable } from '@nestjs/common'
import { MobilityTier } from '@nemt/db'

export interface BookingCalculationInput {
  mobilityTier: MobilityTier
  distanceMiles: number
  requiresWheelchair: boolean
}

export interface BookingCalculationResult {
  primaryCode: string
  secondaryCodes: string[]
  modifiers: string[]
  requiresHumanReview: boolean
  confidence: number
}

@Injectable()
export class BookingService {
  calculateHCPCSCodes(input: BookingCalculationInput): BookingCalculationResult {
    const result: BookingCalculationResult = {
      primaryCode: '',
      secondaryCodes: ['T2003'], // Always include encounter code
      modifiers: ['UN'],
      requiresHumanReview: false,
      confidence: 0.95,
    }

    // Determine primary code based on mobility tier and requirements
    if (input.requiresWheelchair || input.mobilityTier === 'TIER_3') {
      result.primaryCode = 'A0130' // Wheelchair van
      result.secondaryCodes.push('S0215') // Mileage code
    } else if (input.mobilityTier === 'TIER_2') {
      result.primaryCode = 'A0100' // Non-emergency transportation
      result.secondaryCodes.push('S0215')
    } else {
      result.primaryCode = 'A0100' // Autonomous/ambulatory
      if (input.distanceMiles > 0) {
        result.secondaryCodes.push('S0215')
      }
    }

    // Flag for human review on edge cases
    if (input.distanceMiles > 200) {
      result.requiresHumanReview = true
      result.confidence = 0.7
    }

    if (input.mobilityTier === 'TIER_1' && input.requiresWheelchair) {
      result.requiresHumanReview = true
      result.confidence = 0.5
    }

    return result
  }
}
