# encoding: ascii-8bit

# Copyright 2014 Ball Aerospace & Technologies Corp.
# All Rights Reserved.
#
# This program is free software; you can modify and/or redistribute it
# under the terms of the GNU General Public License
# as published by the Free Software Foundation; version 3 with
# attribution addendums as found in the LICENSE.txt

require 'spec_helper'

module Cosmos
  describe Store do
    before(:each) do
      configure_store()
    end

    describe 'instance' do
      it 'returns the same object' do
        expect(Store.instance).equal?(Store.instance)
      end
    end

    describe 'get_target' do
      it 'raises if target does not exist' do
        expect { Store.instance.get_target('NOTGT') }.to raise_error("Target 'NOTGT' does not exist")
      end

      it 'returns a target hash' do
        tgt = Store.instance.get_target('INST')
        expect(tgt).to be_a(Hash)
        expect(tgt['name']).to eql 'INST'
      end
    end

    describe 'get_packet' do
      it 'raises if target does not exist' do
        expect { Store.instance.get_packet('NOTGT', 'PKT') }.to raise_error("Target 'NOTGT' does not exist")
      end

      it 'raises if packet does not exist' do
        expect { Store.instance.get_packet('INST', 'NOPKT') }.to raise_error("Packet 'NOPKT' does not exist")
      end

      it 'returns a packet hash' do
        pkt = Store.instance.get_packet('INST', 'HEALTH_STATUS', type: 'tlm')
        expect(pkt).to be_a(Hash)
        expect(pkt['target_name']).to eql 'INST'
        expect(pkt['packet_name']).to eql 'HEALTH_STATUS'
        pkt = Store.instance.get_packet('INST', 'COLLECT', type: 'cmd')
        expect(pkt).to be_a(Hash)
        expect(pkt['target_name']).to eql 'INST'
        expect(pkt['packet_name']).to eql 'COLLECT'
      end
    end

    describe 'get_commands' do
      it 'raises if target does not exist' do
        expect { Store.instance.get_commands('NOTGT') }.to raise_error("Target 'NOTGT' does not exist")
      end

      it 'returns a command hash' do
        commands = Store.instance.get_commands('INST')
        expect(commands).to be_a(Array)
        expect(commands[0]['target_name']).to eql('INST')
        expect(commands[-1]['target_name']).to eql('INST')
      end
    end

    describe 'get_telemetry' do
      it 'raises if target does not exist' do
        expect { Store.instance.get_telemetry('NOTGT') }.to raise_error("Target 'NOTGT' does not exist")
      end

      it 'returns a telemetry hash' do
        telemetry = Store.instance.get_telemetry('INST')
        expect(telemetry).to be_a(Array)
        expect(telemetry[0]['target_name']).to eql('INST')
        expect(telemetry[-1]['target_name']).to eql('INST')
      end
    end
  end
end
