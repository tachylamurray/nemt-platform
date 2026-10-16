import { Test, TestingModule } from '@nestjs/testing'
import { BookingService } from '../booking.service'

describe('BookingService', () => {
  let service: BookingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingService],
    }).compile()

    service = module.get<BookingService>(BookingService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('calculateHCPCSCodes', () => {
    it('should return A0130 for Tier 3 WAV trips (now default)', () => {
      const result = service.calculateHCPCSCodes({
        mobilityTier: 'TIER_3',
        distanceMiles: 15,
        requiresWheelchair: true,
      })

      expect(result.primaryCode).toBe('A0130')
      expect(result.secondaryCodes).toContain('T2003')
      expect(result.secondaryCodes).toContain('S0215')
    })

    it('should return A0100 for Tier 1 autonomous trips (coming soon)', () => {
      const result = service.calculateHCPCSCodes({
        mobilityTier: 'TIER_1',
        distanceMiles: 10,
        requiresWheelchair: false,
      })

      expect(result.primaryCode).toBe('A0100')
      expect(result.secondaryCodes).toContain('T2003')
    })

    it('should flag trips requiring human review for edge cases', () => {
      const result = service.calculateHCPCSCodes({
        mobilityTier: 'TIER_3',
        distanceMiles: 500, // Unusually long distance
        requiresWheelchair: true,
      })

      expect(result.requiresHumanReview).toBe(true)
    })
  })
})
